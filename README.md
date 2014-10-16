# Self-avoiding Walk

I came across an interesting problem when I was implementing the game: [squirrel and acorn](http://xming13.github.io/squirrel-and-acorn/) and was wondering how many different paths are there for the squirrel to move from the top left to the bottom right without revisiting the same square twice.

So after much googling, I found out that it is called [self-avoiding walk](http://en.wikipedia.org/wiki/Self-avoiding_walk)

> A self-avoiding walk is a path from one point to another which never intersects itself.

> Self-avoiding rook walks are walks on an m×n grid which start from (0,0), end at (m,n), and are composed of only horizontal and vertical steps. 

> The values for  m=n=1, 2, ... are 2, 12, 184, 8512, 1262816, ... 

> \- http://mathworld.wolfram.com/Self-AvoidingWalk.html

How about writing some script to test it out? :)

## Implementation
[Web Worker](http://www.html5rocks.com/en/tutorials/workers/basics/) is used to avoid maximum call stack size exceeded error as many recursive calls are involved.

Unfortunately, when the grid size over 7, it seems to take forever!