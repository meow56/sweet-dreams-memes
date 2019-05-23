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
var nodeRadius = 20; // the radius of each node, also used to determine the margins of the svg
var genY = 200; // height difference between generations
var mainTree;
var svg;

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
  this.x;
  this.y;
  this.display = function(nodes, i) {
    if(this.off) {
      this.x = xOffset + nodeRadius;
    } else {
      var newNodes = [];
      var position;
      for(var j = 0; j < nodes.length; j++) {
        if(nodes[j].gen === this.gen && !nodes[j].off) {
          newNodes.push(nodes[j]);
          if(j === i) {
            position = newNodes.length - 1;
          }
        }
      }
      this.x = ((svg.getAttributeNS(null, "width") - xOffset) * (position + 1) / (newNodes.length + 1)) + xOffset + nodeRadius;
    }
    this.y = nodeRadius + yOffset + (genY * this.gen);
    var newLink = document.createElementNS("http://www.w3.org/2000/svg", "a");
    newLink.setAttributeNS(null, "href", this.meta.link);
    newLink.setAttributeNS(null, "target", "_blank");
    if(this.gen <= 25) {
      // triangle
      var nodeSymbol = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      nodeSymbol.setAttributeNS(null, "id", this.meta.name);
      nodeSymbol.setAttributeNS(null, "points", this.x + "," + (this.y - nodeRadius) + " " + (this.x + (nodeRadius * Math.sqrt(3) / 2)) + "," + (this.y + (nodeRadius / 2)) + " " + (this.x - (nodeRadius * Math.sqrt(3) / 2)) + "," + (this.y + (nodeRadius / 2)));
      nodeSymbol.setAttributeNS(null, "fill", "white");
    } else if(this.gen <= 50) {
      // diamond
    } else if(this.gen <= 75) {
      // circle
      var nodeSymbol = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      nodeSymbol.setAttributeNS(null, "id", this.meta.name);
      nodeSymbol.setAttributeNS(null, "r", "" + nodeRadius);
      nodeSymbol.setAttributeNS(null, "cx", "" + this.x);
      nodeSymbol.setAttributeNS(null, "cy", "" + this.y);
      nodeSymbol.setAttributeNS(null, "fill", "white");
    } else {
      // square
    }
    
    function createInfoBox(e) {
      var mainNode;
      for(var i = 0; i < mainTree.nodes.length; i++) {
        if(e.target.id === mainTree.nodes[i].meta.name) {
          mainNode = mainTree.nodes[i];
        }
      }
      var newTri = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      newTri.setAttributeNS(null, "id", mainNode.meta.name + "hovertri");
      newTri.setAttributeNS(null, "points", (mainNode.x + nodeRadius + 5) + "," + mainNode.y + " " + (mainNode.x + nodeRadius + 5 + 20) + "," + mainNode.y + " " + (mainNode.x + nodeRadius + 5 + 20) + "," + (mainNode.y + 20));
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        newTri.setAttributeNS(null, "points", (mainNode.x + nodeRadius + 5) + "," + mainNode.y + " " + (mainNode.x + nodeRadius + 5 + 20) + "," + mainNode.y + " " + (mainNode.x + nodeRadius + 5 + 20) + "," + (mainNode.y - 20));
      }
      newTri.setAttributeNS(null, "fill", "white");
      svg.appendChild(newTri);
      var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, "id", mainNode.meta.name + "hoverrect");
      newRect.setAttributeNS(null, "x", "" + (mainNode.x + nodeRadius + 5 + 20));
      newRect.setAttributeNS(null, "y", "" + mainNode.y);
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        newRect.setAttributeNS(null, "y", "" + (mainNode.y - 100));
      }
      newRect.setAttributeNS(null, "height", "100");
      newRect.setAttributeNS(null, "width", "200");
      newRect.setAttributeNS(null, "fill", "white");
      svg.appendChild(newRect);
      var newForeignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      newForeignObject.setAttributeNS(null, "id", mainNode.meta.name + "hoverforeignobject");
      newForeignObject.setAttributeNS(null, "x", "" + (mainNode.x + nodeRadius + 5 + 20));
      newForeignObject.setAttributeNS(null, "y", "" + mainNode.y);
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        newForeignObject.setAttributeNS(null, "y", "" + (mainNode.y - 100));
      }
      newForeignObject.setAttributeNS(null, "height", "100");
      newForeignObject.setAttributeNS(null, "width", "200");
      var title = document.createElement("div");
      title.id = mainNode.meta.name + "hovertitle";
      title.xmlns = "http://www.w3.org/1999/xhtml";
      title.textContent = mainNode.meta.name;
      title.style.fontSize = "20px";
      newForeignObject.appendChild(title);
      var byline = document.createElement("div");
      byline.id = mainNode.meta.name + "hoverbyline";
      byline.xmlns = "http://www.w3.org/1999/xhtml";
      byline.textContent = "Created by " + mainNode.meta.by + ", on " + mainNode.meta.date;
      byline.style.fontSize = "10px";
      newForeignObject.appendChild(byline);
      var desc = document.createElement("div");
      desc.id = mainNode.meta.name + "hoverdesc";
      desc.xmlns = "http://www.w3.org/1999/xhtml";
      desc.textContent = mainNode.meta.desc;
      desc.style.fontSize = "12px";
      newForeignObject.appendChild(desc);
      svg.appendChild(newForeignObject);
    }
    
    function removeInfoBox(e) {
      var mainNode;
      for(var i = 0; i < mainTree.nodes.length; i++) {
        if(e.target.id === mainTree.nodes[i].meta.name) {
          mainNode = mainTree.nodes[i];
        }
      }
      document.getElementById(mainNode.meta.name + "hovertri").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hovertri"));
      document.getElementById(mainNode.meta.name + "hoverrect").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hoverrect"));
      document.getElementById(mainNode.meta.name + "hovertitle").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hovertitle"));
      document.getElementById(mainNode.meta.name + "hoverbyline").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hoverbyline"));
      document.getElementById(mainNode.meta.name + "hoverdesc").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hoverdesc"));
      document.getElementById(mainNode.meta.name + "hoverforeignobject").parentNode.removeChild(document.getElementById(mainNode.meta.name + "hoverforeignobject"));
    }
    
    if(this.par) {
      var startX = this.par.x;
      var endX = this.x;
      if(this.gen <= 25) {
        var startY = this.par.y + (nodeRadius / 2);
        var endY = this.y - nodeRadius;
      } else if(this.gen <= 50) {
        var startY = this.par.y + nodeRadius;
        var endY = this.y - nodeRadius;
      } else if(this.gen <= 75) {
        var startY = this.par.y + nodeRadius;
        var endY = this.y - nodeRadius;
      } else {
        var startY = this.par.y + (nodeRadius / Math.sqrt(2));
        var endY = this.y - (nodeRadius / Math.sqrt(2));
      }
      var p1X = startX;
      var p1Y = startY + ((startY + endY) / 2);
      var p2X = endX;
      var p2Y = p1Y;
      var parChiLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
      parChiLine.setAttributeNS(null, "stroke", "black");
      parChiLine.setAttributeNS(null, "stroke-width", "3");
      parChiLine.setAttributeNS(null, "fill", "none");
      parChiLine.setAttributeNS(null, "d", "M " + startX + "," + startY + " C " + p1X + "," + p1Y + " " + p2X + "," + p2Y + " " + endX + "," + endY);
      svg.appendChild(parChiLine);
    }
    
    nodeSymbol.addEventListener("mouseover", createInfoBox);
    nodeSymbol.addEventListener("mouseout", removeInfoBox);
    newLink.appendChild(nodeSymbol);
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
                                   link: "sdfsdf"}, true),
                         new Node({name: "strongeset",
                                   by: "STRONGESET!!!!",
                                   date: "09/09/09",
                                   desc: "EYE'M THA STRONGESET!!!",
                                   link: "fjofojfojF"}),
                         new Node({name: "blaze it",
                                   by: "420",
                                   date: "April 20, 2069",
                                   desc: "epic",
                                   link: "BLAZEit"}, true)
                        ]); // please ACTUALLY define mainTree here once everything works
    
    mainTree.nodes[1].par = mainTree.nodes[0];
    mainTree.nodes[2].par = mainTree.nodes[0];
    
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
    svg.setAttributeNS(null, "height", "" + (highGen * genY + 2 * nodeRadius + 2 * yOffset));
    var gen1Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gen1Rect.setAttributeNS(null, "width", "" + document.getElementById("mainDiv").offsetWidth);
    gen1Rect.setAttributeNS(null, "height", "" + (((100 * genY) + 2 * nodeRadius) / 4));
    gen1Rect.setAttributeNS(null, "y", "" + genY);
    gen1Rect.setAttributeNS(null, "fill", "#ff3859");
    var gen2Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gen2Rect.setAttributeNS(null, "width", "" + document.getElementById("mainDiv").offsetWidth);
    gen2Rect.setAttributeNS(null, "height", "" + ((100 * genY + 2 * nodeRadius) / 4));
    gen2Rect.setAttributeNS(null, "y", "" + (((100 * genY + 2 * nodeRadius) / 4) + genY));
    gen2Rect.setAttributeNS(null, "fill", "#45a2e5");
    var gen3Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gen3Rect.setAttributeNS(null, "width", "" + document.getElementById("mainDiv").offsetWidth);
    gen3Rect.setAttributeNS(null, "height", "" + ((100 * genY + 2 * nodeRadius) / 4));
    gen3Rect.setAttributeNS(null, "y", "" + (((100 * genY + 2 * nodeRadius) / 2) + genY));
    gen3Rect.setAttributeNS(null, "fill", "#fec009");
    var gen4Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    gen4Rect.setAttributeNS(null, "width", "" + document.getElementById("mainDiv").offsetWidth);
    gen4Rect.setAttributeNS(null, "height", "" + ((100 * genY + 2 * nodeRadius) / 4));
    gen4Rect.setAttributeNS(null, "y", "" + (((100 * genY + 2 * nodeRadius) * 3 / 4) + genY));
    gen4Rect.setAttributeNS(null, "fill", "#67be39");
    svg.appendChild(gen1Rect);
    svg.appendChild(gen2Rect);
    svg.appendChild(gen3Rect);
    svg.appendChild(gen4Rect);
    for(var i = 0; i < highGen + 1; i++) {
      var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      newLine.setAttributeNS(null, "x1", "0");
      newLine.setAttributeNS(null, "y1", "" + (i * genY + yOffset + nodeRadius));
      newLine.setAttributeNS(null, "x2", "" + svg.getAttributeNS(null, "width"));
      newLine.setAttributeNS(null, "y2", "" + (i * genY + yOffset + nodeRadius));
      newLine.setAttributeNS(null, "stroke", "black");
      svg.appendChild(newLine);
      var genText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      genText.setAttributeNS(null, "style", "text-align: right;");
      genText.setAttributeNS(null, "x", "" + svg.getAttributeNS(null, "width"));
      genText.setAttributeNS(null, "y", "" + (i * genY + yOffset + nodeRadius));
      genText.textContent = "Gen " + i;
      svg.appendChild(genText);
      // create SVG elements
    }
    document.getElementById("mainDiv").appendChild(svg);
    
    mainTree.display();
  }
}

setup();
