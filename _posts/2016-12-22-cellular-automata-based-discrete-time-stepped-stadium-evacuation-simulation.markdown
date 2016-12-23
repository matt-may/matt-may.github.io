---
layout: post
title:  "Using Cellular Automata for Stochastic Simulation of Stadium Evacuation"
date:   2016-12-22 18:04:00
categories: javascript react rails
---

Cellular automata are a fascinating subject of subject and have captivated
many, including Stephen Wolfram. For a recent project, I worked with a team of
two others to develop a discrete, time-stepped stochastic simulation of the
evacuation of Bobby Dodd Stadium in Atlanta, GA. It was a wonderfully
interesting project, as it gave insight into the bottlenecks around the stadium
that must be carefully managed following a home football game, in order to
promote the most efficient and safe evacuation of the area.

We modeled evacuation of the full stadium capacity, which is over 50,000
people. We assumed each individual was going to one of several possible
destinations following the game, which gave us some realism in our simulation.
Individuals were guided towards their destinations by Dijkstra's shortest-path
algorithm, which is well known for determining the shortest path between two
nodes in a weighted graph.

The simulation was stochastic, in that destinations were selected at random
in additional to other stochastic factors that gave each simulation run a
non-deterministic outcome. We were able to capture a simulation on video,
which [can be seen here](https://www.youtube.com/watch?v=k2iQPcyWEF8&feature=youtu.be).

We adopted a parametric strategy, testing various parameter sets in order to
select the one which yielded the fastest evacuation of the area. Parameters
include things like closing intersections to vehicles, to allow uninhibited
pedestrian traffic. In the end, we were able to determine a key intersection
which needed to be open in order to promote a fast evacuation. For the full
report and full code, [click here to view the Github repository](https://github.com/gatech-cse6730/checkpoint).