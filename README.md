angular-traversal
=================

Implementation of traversal in Angular using angularui routing's state
machine. Send a graph to the client, fireworks ensue. (Deprecated)

Installation
============

1) bower install

2) Open app/index.html

Notes
=====

1) Model your @view_config equivalents using ui-router's states.

2) Your data needs to be shaped a certain way:

- Top node is a dictionary

- Each node needs an __name__ property

- If the node is a collection, it needs an items property

3) Hand the traversalService a pile of JSON data.

4) Still need to implement some traversal stuff (assigning a view to
all contexts, getting a context that is an implementation of a
user-defined class, etc.)
