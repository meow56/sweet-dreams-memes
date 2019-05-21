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
var nodeRadius = 10; // the radius of each node, also used to determine the margins of the svg
var genY = 100; // height difference between generations

function owo() {
  if(!document.getElementById("mainDiv")) {
    setTimeout(owo, 100);
  } else {
var newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttributeNS(null, "r", "10");
    newCircle.setAttributeNS(null, "cx", "50");
    newCircle.setAttributeNS(null, "cy", "50");
svg.appendChild(newCircle);
var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
newLine.setAttributeNS(null, "x1", "0");
newLine.setAttributeNS(null, "y1", "20");
newLine.setAttributeNS(null, "x2", "100");
newLine.setAttributeNS(null, "y2", "80");
newLine.setAttributeNS(null, "stroke", "black");
svg.appendChild(newLine);
return document.getElementById("mainDiv").appendChild(svg);
  }
}

function Tree(nodes) {
  this.nodes = nodes;
  this.display = function() {
    for(var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].display(this.nodes, i);
    }
  }
}

function Node(parent, metadata, official) {
  this.par = parent;
  this.meta = metadata; // object that holds stuff like the name, date, description, link
  this.off = official || false;
  this.gen = parent.gen ? parent.gen : 0;
  this.display = function(nodes, i) {
    if(this.off) {
      this.x = xOffset;
    } else {
      var newNodes = [];
      for(var j = 0; j < nodes.length; j++) {
        if(nodes[j].gen === this.gen) {
          newNodes.push(nodes[j]);
        }
      }
      this.x = ((document.getElementById("mainDiv").width - xOffset) * i / newNodes.length) + xOffset;
    }
    this.y = yOffset + (genY * this.gen);
    /* Update to SVG later
    var nodeDiv = document.createElement("div");
    nodeDiv.id = this.meta.name;
    nodeDiv.borderRadius = 50%;
    nodeDiv.backgroundPosition = "left " + this.x + "px top " + this.y + "px";
    document.getElementById("mainDiv").appendChild(nodeDiv);
    */
  }
}

function setup() {
  
  // please define mainTree here
  
  var highGen = 0;
  for(var i = 0; i < mainTree.nodes.length; i++) {
    if(mainTree.nodes[i].gen > highGen) {
      highGen = mainTree.nodes[i].gen;
    }
  }
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "width", "" + (document.getElementById("mainDiv").width - xOffset + 2 * nodeRadius));
  svg.setAttributeNS(null, "height", "" + ((highGen + 2) * genY + 2 * nodeRadius);
  for(var i = 0; i < highGen + 1; i++) {
    var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    newLine.setAttributeNS(null, "x1", "0");
    newLine.setAttributeNS(null, "y1", "" + (i * genY));
    newLine.setAttributeNS(null, "x2", "" + svg.width - (2 * nodeRadius));
    newLine.setAttributeNS(null, "y2", "" + (i * genY));
    newLine.setAttributeNS(null, "stroke", "grey");
    svg.appendChild(newLine);
    // create SVG elements
  }
}

owo();
