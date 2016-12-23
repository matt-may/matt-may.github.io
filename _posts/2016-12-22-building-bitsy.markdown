---
layout: post
title:  "Bitsy: A simple React app for note-taking"
date:   2016-12-22 18:04:00
categories: javascript react rails
---

Facebook's React has really grown in popularity in the last few years, to the
extent that it is now expected knowledge for a front-end developer. React brings
some interesting concepts to the world of front-end development, which has
traditionally been quite messy and hacky. Facebook's enormous scale has
required they take some dramatically different approaches to development to
keep things manageable with the large number of developers working on the
same codebase.

To explore React (which I'd been wanting to do for a while), I built a little
app called [Bitsy](https://bitsy.pro). Bitsy is similar to Apple's Notes or
Evernote, but relatively more minimal. It has a simple rich text editor that
allows you to create notes and add simple styling. It also lets you easily page
through all your past notes and quickly search them. My motivation to create it
was that Notes, while a wonderful little app, is not accessible via the Web
and thus can't be accessed on Windows or other non-Apple devices. I also hadn't
enjoyed the user experience of Evernote, finding it almost too minimalistic and
not wanting to upgrade to a paid plan.

While it took a little getting used to, once I fully groked React's
unidirectional data flow and its penchant towards immutability, development
became very straightforward. The previous applications I'd written in jQuery
quickly seemed to be something from the dark ages.

With React, at least in my case, more time was spent thinking and architecting
than writing code. Once I knew what I wanted to happen, it was relatively
straightforward to implement that in my code. In an imperative language, one
often may spend relatively more time in the implementation details than the
actual architecture. To some extent, this is the value proposition of React,
and why I suppose many developers are flocking to it.

It will be fascinating to see what React looks like in five years. The rise of
functional influences and declarative programming in front-end development
seem almost universally a good thing, coming from someone who has needed
to maintain 1000-line PHP scripts. The focus on small, re-usable components
that contain encapsulated state and that receive their properties from
components above them in the hierarchy does seem to promote more maintainable
code.

For Bitsy, the frontend and backend were developed relatively separately;
however, the frontend React single-page application is embedded within the
Rails code, which allowed me to use session-based authentication through
Rails' devise gem instead of having to build a token-based solution.
On the backend, Postgresql was used for the database, and Elasticsearch powers
the search functionality. Facebook login through the wonderful
omniauth-facebook gem was chosen as the authentication solution. It was truly
a breeze to set up.

Please feel free to check out [Bitsy](https://bitsy.pro) and let me know what
you think.