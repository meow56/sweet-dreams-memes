/*
First off:
how do tree
  create object class node with parent

Second:
how do display
  abuse border-radius
*/

var xOffset = 10; // how far to the right the first node is
var yOffset = 10; // how far down the first node is
var genY = 100; // height difference between generations

function Tree(nodes) {
  this.nodes = nodes;
  this.display = function() {
    for(var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].display();
    }
  }
}

function Node(parent, link, official) {
  this.par = parent;
  this.link = link;
  this.off = official;
  this.gen = parent.gen ? parent.gen : 0;
  this.display = function() {
    if(this.off) {
      this.x = xOffset;
      this.y = yOffset + (genY * this.gen);
      var nodeDiv = document.createElement("div");
    }
  }
}
