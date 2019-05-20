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

function owo() {
  if(!!document.getElementsByTagName("body")) {
    setTimeout(1000, owo);
  } else {
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "width", "100");
    svg.setAttributeNS(null, "height", "100");
var newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttributeNS(null, "r", "10");
    newCircle.setAttributeNS(null, "cx", "50");
    newCircle.setAttributeNS(null, "cy", "50");
svg.appendChild(newCircle);
var newLine = document.createElementNS(null, "line");
newLine.setAttributeNS(null, "x1", "0");
newLine.setAttributeNS(null, "y1", "20");
newLine.setAttributeNS(null, "x2", "100");
newLine.setAttributeNS(null, "y2", "80");
newLine.setAttributeNS(null, "stroke", "black");
svg.appendChild(newLine);
document.getElementsByTagName("body")[0].appendChild(svg);
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
  var svg = document.createElement("svg");
  svg.id = "mainSVG";
  
  // please define mainTree here
  
  var highGen = 0;
  for(var i = 0; i < mainTree.nodes.length; i++) {
    if(mainTree.nodes[i].gen > highGen) {
      highGen = mainTree.nodes[i].gen;
    }
  }
  svg.viewbox = "0 0 " + (document.getElementById("mainDiv").width - xOffset) + " " + ((highGen + 1) * genY);
  for(var i = 0; i < highGen; i++) {
    // create SVG elements
  }
}

owo();
