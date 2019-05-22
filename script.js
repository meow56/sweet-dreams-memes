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
var genY = 200; // height difference between generations
var mainTree;
var svg;

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

function Node(metadata, official) {
  this.par;
  this.meta = metadata; // object that holds stuff like the name, date, description, link
  this.off = official || false;
  this.gen;
  this.display = function(nodes, i) {
    if(this.off) {
      this.x = xOffset;
    } else {
      var newNodes = [];
      var position;
      for(var j = 0; j < nodes.length; j++) {
        if(nodes[j].gen === this.gen) {
          newNodes.push(nodes[j]);
          if(j === i) {
            position = newNodes.length - 1;
          }
        }
      }
      this.x = ((svg.getAttributeNS(null, "width") - xOffset) * (position + 1) / (newNodes.length + 1)) + xOffset;
    }
    this.y = yOffset + (genY * this.gen);
    var newLink = document.createElementNS("http://www.w3.org/2000/svg", "a");
    newLink.setAttributeNS(null, "href", this.meta.link);
    var newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    newCircle.setAttributeNS(null, "id", this.meta.name);
    newCircle.setAttributeNS(null, "r", "" + nodeRadius);
    newCircle.setAttributeNS(null, "cx", "" + this.x);
    newCircle.setAttributeNS(null, "cy", "" + this.y);
    
    function createInfoBox(e) {
      var newTri = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      newTri.setAttributeNS(null, "id", e.target.meta.name + "hovertri");
      newTri.setAttributeNS(null, "points", (e.target.x + nodeRadius + 5) + "," + e.target.y + " " + (e.target.x + nodeRadius + 5 + 20) + "," + e.target.y + " " + (e.target.x + nodeRadius + 5 + 20) + "," + (e.target.y + 20));
      newTri.setAttributeNS(null, "fill", "white");
      newTri.setAttributeNS(null, "stroke", "black"); // change to none when background fulfilled
      svg.appendChild(newTri);
      var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, "id", e.target.meta.name + "hoverrect");
      newRect.setAttributeNS(null, "x", "" + (e.target.x + nodeRadius + 5 + 20));
      newRect.setAttributeNS(null, "y", "" + e.target.y);
      newRect.setAttributeNS(null, "height", "100");
      newRect.setAttributeNS(null, "width", "200");
      newRect.setAttributeNS(null, "fill", "white");
      newRect.setAttributeNS(null, "stroke", "black"); // change to none when background fulfilled
      svg.appendChild(newRect);
      var title = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      var newP = document.createElement("p");
      newP.xmlns = "http://www.w3.org/1999/xhtml";
      newP.textContent = e.target.meta.name;
      newP.style.fontSize = 20;
      title.appendChild(newP);
      title.setAttributeNS(null, "id", e.target.meta.name + "hovertitle");
      title.setAttributeNS(null, "x", "" + (e.target.x + nodeRadius + 5 + 20));
      title.setAttributeNS(null, "y", "" + e.target.y);
      title.setAttributeNS(null, "height", "100");
      title.setAttributeNS(null, "width", "200");
      svg.appendChild(title);
      var byline = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      var newP = document.createElement("p");
      newP.xmlns = "http://www.w3.org/1999/xhtml";
      newP.textContent = "Created by " + e.target.meta.by + ", on " + e.target.meta.date;
      newP.style.fontSize = 10;
      byline.appendChild(newP);
      byline.setAttributeNS(null, "id", e.target.meta.name + "hoverbyline");
      byline.setAttributeNS(null, "x", "" + (e.target.x + nodeRadius + 5 + 20));
      byline.setAttributeNS(null, "y", "" + e.target.y + 27);
      byline.setAttributeNS(null, "height", "100");
      byline.setAttributeNS(null, "width", "200");
      svg.appendChild(byline);
      var desc = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      var newP = document.createElement("p");
      newP.xmlns = "http://www.w3.org/1999/xhtml";
      newP.textContent = e.target.meta.desc;
      newP.style.fontSize = 12;
      desc.appendChild(newP);
      desc.setAttributeNS(null, "id", e.target.meta.name + "hoverdesc");
      desc.setAttributeNS(null, "x", "" + (e.target.x + nodeRadius + 5 + 20));
      desc.setAttributeNS(null, "y", "" + e.target.y + 42);
      desc.setAttributeNS(null, "height", "100");
      desc.setAttributeNS(null, "width", "200");
      svg.appendChild(byline);
    }
    
    function removeInfoBox(e) {
      document.getElementById(e.target.meta.name + "hovertri").parentNode.removeChild(document.getElementById(e.target.meta.name + "hovertri"));
      document.getElementById(e.target.meta.name + "hoverrect").parentNode.removeChild(document.getElementById(e.target.meta.name + "hoverrect"));
      document.getElementById(e.target.meta.name + "hovertitle").parentNode.removeChild(document.getElementById(e.target.meta.name + "hovertitle"));
      document.getElementById(e.target.meta.name + "hoverbyline").parentNode.removeChild(document.getElementById(e.target.meta.name + "hoverbyline"));
      document.getElementById(e.target.meta.name + "hoverdesc").parentNode.removeChild(document.getElementById(e.target.meta.name + "hoverdesc"));
    }
    
    newCircle.addEventListener("mouseover", createInfoBox);
    newCircle.addEventListener("mouseout", removeInfoBox);
    newLink.appendChild(newCircle);
    svg.appendChild(newLink);
  }
}

function setup() {
  if(!document.getElementById("mainDiv")) {
    setTimeout(setup, 1);
  } else {
    
    mainTree = new Tree([new Node({name: "owo", 
                                   by: "epic meeeeem",
                                   date: "05/20/40", 
                                   desc: "When the world is ravaged by furries, the only savior of humanity will be one of those cat spritzers.", 
                                   link: "sdfsdf"}),
                         new Node({name: "strongeset",
                                   by: "STRONGESET!!!!",
                                   date: "09/09/09",
                                   desc: "EYE'M THA STRONGESET!!!",
                                   link: "fjofojfojF"})
                        ]); // please ACTUALLY define mainTree here once everything works
    
    mainTree.nodes[1].par = mainTree.nodes[0];
    for(var i = 0; i < mainTree.nodes.length; i++) {
      mainTree.nodes[i].gen = mainTree.nodes[i].par ? (mainTree.nodes[i].par.gen + 1) : 0;
    }
    
    var highGen = 0;
    for(var i = 0; i < mainTree.nodes.length; i++) {
      if(mainTree.nodes[i].gen > highGen) {
        highGen = mainTree.nodes[i].gen;
      }
    }
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "width", "" + (document.getElementById("mainDiv").offsetWidth));
    svg.setAttributeNS(null, "height", "" + ((highGen + 2) * genY + 2 * nodeRadius));
    for(var i = 0; i < highGen + 1; i++) {
      var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      newLine.setAttributeNS(null, "x1", "0");
      newLine.setAttributeNS(null, "y1", "" + (i * genY + yOffset));
      newLine.setAttributeNS(null, "x2", "" + svg.getAttributeNS(null, "width") - (2 * nodeRadius));
      newLine.setAttributeNS(null, "y2", "" + (i * genY + yOffset));
      newLine.setAttributeNS(null, "stroke", "grey");
      svg.appendChild(newLine);
      // create SVG elements
    }
    document.getElementById("mainDiv").appendChild(svg);
    
    mainTree.display();
  }
}

setup();
