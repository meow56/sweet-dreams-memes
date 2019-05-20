/*
First off:
how do tree

*/

function Node(parent) {
  this.par = parent;
  this.gen = parent.gen ? parent.gen : 0;
}
