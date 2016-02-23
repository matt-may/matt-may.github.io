(function () {
    // Creates a Sankey chart for the data in poc.json.
    var units = "refugees";

    var margin = {top: 10, right: 10, bottom: 10, left: 10};

    // Width needs to be global for sankey.js to work properly.
    width = 960 - margin.left - margin.right;
    var height = 900 - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function(d) { return formatNumber(d) + " " + units; },
        color = d3.scale.category20();

    function loadGraph(year) {
        // Create tooltip.
        var tip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset(function() {
                        return [this.getBBox().height / 2, 0]
                    })
                    .html(generateTip);

        // append the svg canvas to the page
        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        // Invoke the tooltip in the svg context.
        svg.call(tip)

        // Set the sankey diagram properties
        var sankey = d3.sankey()
            .nodeWidth(36)
            .nodePadding(40)
            .size([width, height]);

        var path = sankey.link();

        // load the data
        d3.json("../data/poc.json", function (error, json) {
            var links = [],
                distinctNodes = {},
                nodeID = 0;

            // For every row in our data.
            for (var i = 0; i < json.length; i++) {
                var row = json[i];

                // If the data has been filtered (via the year slider), only
                // include the rows for the selected year.
                if (year && row["Year"] !== year) continue;

                // Save off the origin (source) and target.
                var origin = row["Origin"];
                var target = row["Country / territory of asylum/residence"];

                // If there's not an entry yet in the distinctNodes object,
                // add one.
                if (!(origin in distinctNodes)) {
                    distinctNodes[origin] = nodeID;
                    nodeID++;
                }

                // Also add the target if it's not yet in the distinctNodes
                // object.
                if (!(target in distinctNodes)) {
                    distinctNodes[target] = nodeID;
                    nodeID++;
                }

                // Save off our value, which is the number of refugees.
                var value = row["Refugees (incl. refugee-like situations)"];

                // If the value is not a number, just set it to null.
                if (isNaN(value)) value = null;

                // Add the link.
                links.push({
                    "source": distinctNodes[origin],
                    "target": distinctNodes[target],
                    "value": value
                });
            }

            // Prepare our nodes array.
            //
            // * Uses ECMAScript 6 arrow function.
            //
            var nodes = Object.keys(distinctNodes).map((key, value) => ({ node: value, name: key }));

            sankey
              .nodes(nodes)
              .links(links)
              .layout(32);

            // add in the links
              var link = svg.append("g").selectAll(".link")
                  .data(links)
                .enter().append("path")
                  .attr("class", "link")
                  .attr("d", path)
                  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
                  .sort(function(a, b) { return b.dy - a.dy; })
                  .on('mouseover', tip.show)
                  .on('mouseout', tip.hide);

            // add in the nodes
              var node = svg.append("g").selectAll(".node")
                  .data(nodes)
                .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) {
                      return "translate(" + d.x + "," + d.y + ")"; })
                .call(d3.behavior.drag()
                  .origin(function(d) { return d; })
                  .on("dragstart", function() {
                      this.parentNode.appendChild(this); })
                  .on("drag", dragmove));

            // add the rectangles for the nodes
              node.append("rect")
                  .attr("height", function(d) { return d.dy; })
                  .attr("width", sankey.nodeWidth())
                  .style("fill", function(d) {
                      return d.color = color(d.name.replace(/ .*/, "")); })
                  .style("stroke", function(d) {
                      return d3.rgb(d.color).darker(2); })
                .append("title")
                  .text(function(d) {
                      return d.name + "\n" + format(d.value); });

            // add in the title for the nodes
              node.append("text")
                  .attr("x", -6)
                  .attr("y", function(d) { return d.dy / 2; })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "end")
                  .attr("transform", null)
                  .text(function(d) { return d.name; })
                .filter(function(d) { return d.x < width / 2; })
                  .attr("x", 6 + sankey.nodeWidth())
                  .attr("text-anchor", "start");

            // the function for moving the nodes
              function dragmove(d) {
                d3.select(this).attr("transform",
                    "translate(" + d.x + "," + (
                            d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                        ) + ")");
                sankey.relayout();
                link.attr("d", path);
              }
        });
    }

    // Initial graph load.
    loadGraph();

    // Creates slider for filtering data by year.
    d3.select("#slider").call(d3.slider()
                                .axis(true)
                                .min(2005)
                                .max(2014)
                                .step(1)
                                .on("slide", function(evt, value) {
                                    d3.select("#chart").remove();
                                    d3.select("body").append("div").attr("id", "chart");
                                    loadGraph(+value);
                                }));

    // Generates tooltip markup.
    function generateTip(link) {
        return "<p>" + link.source.name + " to " + link.target.name + " : " + format(link.value) + "</p>";
    }
})();