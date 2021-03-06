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
    } else if(this.gen <= 49) {
      // diamond
      var nodeSymbol = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      nodeSymbol.setAttributeNS(null, "id", this.meta.name);
      nodeSymbol.setAttributeNS(null, "points", this.x + "," + (this.y - nodeRadius) + " " + (this.x + nodeRadius) + "," + this.y + " " + this.x + "," + (this.y + nodeRadius) + " " + (this.x - nodeRadius) + "," + this.y);
      nodeSymbol.setAttributeNS(null, "fill", "white");
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
      var nodeSymbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      nodeSymbol.setAttributeNS(null, "id", this.meta.name);
      nodeSymbol.setAttributeNS(null, "x", "" + (this.x - (nodeRadius / Math.sqrt(2))));
      nodeSymbol.setAttributeNS(null, "y", "" + (this.y - (nodeRadius / Math.sqrt(2))));
      nodeSymbol.setAttributeNS(null, "width", "" + (nodeRadius * Math.sqrt(2)));
      nodeSymbol.setAttributeNS(null, "height", "" + (nodeRadius * Math.sqrt(2)));
      nodeSymbol.setAttributeNS(null, "fill", "white");
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
      var finalX = mainNode.x + nodeRadius + 5 + 20;
      var finalX2 = mainNode.x + nodeRadius + 5;
      var finalY = mainNode.y + 20;
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        finalY = mainNode.y - 20;
      }
      if(svg.getAttributeNS(null, "width") - 200 - 20 - 5 - nodeRadius <= mainNode.x) {
        finalX = mainNode.x - nodeRadius - 5 - 20;
        finalX2 = mainNode.x - nodeRadius - 5;
      }
      newTri.setAttributeNS(null, "points", finalX2 + "," + mainNode.y + " " + finalX + "," + mainNode.y + " " + finalX + "," + finalY);
      newTri.setAttributeNS(null, "fill", "white");
      svg.appendChild(newTri);
      var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      newRect.setAttributeNS(null, "id", mainNode.meta.name + "hoverrect");
      newRect.setAttributeNS(null, "x", "" + (mainNode.x + nodeRadius + 5 + 20));
      newRect.setAttributeNS(null, "y", "" + mainNode.y);
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        newRect.setAttributeNS(null, "y", "" + (mainNode.y - 150));
      }
      if(svg.getAttributeNS(null, "width") - 200 - 20 - 5 - nodeRadius <= mainNode.x) {
        newRect.setAttributeNS(null, "x", "" + (mainNode.x - nodeRadius - 5 - 20 - 200));
      }
      newRect.setAttributeNS(null, "height", "150");
      newRect.setAttributeNS(null, "width", "200");
      newRect.setAttributeNS(null, "fill", "white");
      svg.appendChild(newRect);
      var newForeignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      newForeignObject.setAttributeNS(null, "id", mainNode.meta.name + "hoverforeignobject");
      newForeignObject.setAttributeNS(null, "x", "" + (mainNode.x + nodeRadius + 5 + 20));
      newForeignObject.setAttributeNS(null, "y", "" + mainNode.y);
      if(svg.getAttributeNS(null, "height") - nodeRadius - yOffset === mainNode.y) {
        newForeignObject.setAttributeNS(null, "y", "" + (mainNode.y - 150));
      }
      if(svg.getAttributeNS(null, "width") - 200 - 20 - 5 - nodeRadius <= mainNode.x) {
        newForeignObject.setAttributeNS(null, "x", "" + (mainNode.x - nodeRadius - 5 - 20 - 200));
      }
      newForeignObject.setAttributeNS(null, "height", "150");
      newForeignObject.setAttributeNS(null, "width", "200");
      var title = document.createElement("div");
      title.id = mainNode.meta.name + "hovertitle";
      title.xmlns = "http://www.w3.org/1999/xhtml";
      title.textContent = mainNode.meta.name;
      title.style.fontSize = "17px";
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
        if(this.gen === 26) {
          startY = this.par.y + (nodeRadius / 2);
        }
        var endY = this.y - nodeRadius;
      } else if(this.gen <= 75) {
        var startY = this.par.y + nodeRadius;
        if(this.gen === 51) {
          startY = this.par.y + nodeRadius;
        }
        var endY = this.y - nodeRadius;
      } else {
        var startY = this.par.y + (nodeRadius / Math.sqrt(2));
        if(this.gen === 76) {
          startY = this.par.y + nodeRadius;
        }
        var endY = this.y - (nodeRadius / Math.sqrt(2));
      }
      var p1X = startX;
      var p1Y = startY + ((endY - startY) / 2);
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
    
    mainTree = new Tree([new Node({name: "Sweet Dreams (Are Made Of This)", 
                                   by: "Eurythmics",
                                   date: "April 10, 1983", 
                                   desc: "In a sense, the original.", 
                                   link: "https://www.youtube.com/watch?v=qeMFqkcPYcg"}, true),
                         new Node({name: "sweet dreams but i put kahoot music over it",
                                   by: "zacj",
                                   date: "November 22, 2017",
                                   desc: "The original. The end sounds a little off.",
                                   link: "https://www.youtube.com/watch?v=Ngpf6UtPn4k"}, true),
                         new Node({name: "\"sweet dreams but i put kahoot music over it\" but I fixed the tempo",
                                   by: "SupaSimon",
                                   date: "April 27, 2019",
                                   desc: "Beat fixed.",
                                   link: "https://www.youtube.com/watch?v=0q5vYr-SWlY"}, true),
                         new Node({name: "\"\"sweet dreams but i put kahoot music over it\" but I fixed the tempo\" but I added Joker's gun",
                                   by: "EpikPerson",
                                   date: "May 3, 2019",
                                   desc: "Gun sync v1.",
                                   link: "https://www.youtube.com/watch?v=aSfMKP3nTEQ"}, true),
                         new Node({name: "sweet dreams with the kahoot theme and fixed tempo and Joker's gun but I added the Tainted Love clap",
                                   by: "JackalRelated",
                                   date: "May 4, 2019",
                                   desc: "BUM BUM.",
                                   link: "https://www.youtube.com/watch?v=yO6mRJraWqQ"}, true),
                         new Node({name: "sweet dreams with the kahoot theme & Jokers gun & tainted love clap but I added the crab rave shaker",
                                   by: "ariissleeping",
                                   date: "May 6, 2019",
                                   desc: "___ IS GONE.",
                                   link: "https://www.youtube.com/watch?v=V1X-gz58RLw"}, true),
                         new Node({name: "sweet dreams & kahoot theme & gun & clap & the crab rave & I added the hawaii five-o drum-fill",
                                   by: "Tom Carpenter",
                                   date: "May 7, 2019",
                                   desc: "Drum roll, please.",
                                   link: "https://www.youtube.com/watch?v=Av3F4AULUjU"}, true),
                         new Node({name: "sweet dreams but read the description( this is why god has abandoned us)",
                                   by: "Fruitloopy",
                                   date: "May 8, 2019",
                                   desc: "Down the rabbit hole.",
                                   link: "https://www.youtube.com/watch?v=7JG8CnWSceQ"}, true),
                         new Node({name: "Sweet Dreams-kahoot 8th gen Digging straight down in Minecraft",
                                   by: "Danall Memes",
                                   date: "May 9, 2019",
                                   desc: "\"Efficient\" digging.",
                                   link: "https://www.youtube.com/watch?v=TMRNYJu5yKw"}, true),
                         new Node({name: "Sweet Dreams Kahoot Chain gen 9 whispering the lyrics",
                                   by: "ThatPingThing",
                                   date: "May 9, 2019",
                                   desc: "oh",
                                   link: "https://www.youtube.com/watch?v=MtaVoezRNeI"}, true),
                         new Node({name: "Sweet Dreams Kahoot Chain gen 10 - A Horrible Surprise",
                                   by: "Top Hat Walrus",
                                   date: "May 9, 2019",
                                   desc: "Hoo hoo.",
                                   link: "https://www.youtube.com/watch?v=l8Kmtfdgs1E"}, true),
                         new Node({name: "Sweet Dreams Kahoot Meme: Gen 11 - but I added the intro from \"It Wasn't Me\" by Shaggy",
                                   by: "Sensual_Sweets",
                                   date: "May 9, 2019",
                                   desc: "Alright.",
                                   link: "https://www.youtube.com/watch?v=Yc5xJp67rQU"}, true),
                         new Node({name: "[MEME] Sweet Dreams Kahoot Meme: Gen 12",
                                   by: "LeoTheFish",
                                   date: "May 9, 2019",
                                   desc: "Boom Chakka Chakka.",
                                   link: "https://www.youtube.com/watch?v=97fbK7zsB5A"}, true),
                         new Node({name: "Sweet Dreams Kahoot Meme: Gen 13",
                                   by: "Some Guy",
                                   date: "May 9, 2019",
                                   desc: "Bruh.",
                                   link: "https://www.youtube.com/watch?v=47uXa79-7jU"}, true),
                         new Node({name: "Sweet Dreams kahoot Gen 14 but my computer had a heartattack rendering it",
                                   by: "First",
                                   date: "May 9, 2019",
                                   desc: "Now we're really going down the rabbit hole.",
                                   link: "https://www.youtube.com/watch?v=HG4EhfRmYck"}, true),
                         new Node({name: "Sweet Dreams Kahoot Chain Gen 15: Now with the grand addition of Ethan Klien and Jack Stauber",
                                   by: "ponyqueen7",
                                   date: "May 10, 2019",
                                   desc: "Dancin'.",
                                   link: "https://www.youtube.com/watch?v=OtUsGaiV9wY"}, true),
                         new Node({name: "Sweet dreams but [...] but everything is satisfyingly aligned and mixed (Gen. 16)",
                                   by: "Choinkus",
                                   date: "May 10, 2019",
                                   desc: "Thanks. & Knuckles.",
                                   link: "https://www.youtube.com/watch?v=QJKj43QOA08"}, true),
                         new Node({name: "Sweet dreams Kahoot chain [Gen. 17] More Minecraft",
                                   by: "Papa Putin",
                                   date: "May 11, 2019",
                                   desc: "Efficient digging.",
                                   link: "https://www.youtube.com/watch?v=eKP4rtBWP14"}, true),
                         new Node({name: "[Gen 18] Kahoot Sweet Dreams but I can't fit it so read the description",
                                   by: "LackedRoom140",
                                   date: "May 11, 2019",
                                   desc: "It's Buddy. And Movavi. And Bandicam.",
                                   link: "https://www.youtube.com/watch?v=XPb2EHDoVI4"}, true),
                         new Node({name: "Sweet Dreams Kahoot gen 19 but it's Surprisingly Inspirational",
                                   by: "Cloud the Ampharos",
                                   date: "May 12, 2019",
                                   desc: "We continue this meme, not because it is easy, but because it is hard.",
                                   link: "https://www.youtube.com/watch?v=rMHqZJ3VbvE"}, true),
                         new Node({name: "[Gen 20] Sweet Dreams but I put Kahoot music over it but [...] but I added AmazingPhil dabbing",
                                   by: "in your dreams",
                                   date: "May 12, 2019",
                                   desc: "Now this is epic.",
                                   link: "https://www.youtube.com/watch?v=_iy6Y4CUb0k"}, true),
                         new Node({name: "[Gen 21] Sweet Dreams But I Put Shrek Shouting DONKEY!",
                                   by: "Legendarychiz AJ",
                                   date: "May 12, 2019",
                                   desc: "Donkey, look out!!!",
                                   link: "https://www.youtube.com/watch?v=BbsT5JLkAi4"}, true),
                         new Node({name: "[Gen 22] sweet dreams with kahoot music but it errors a lot",
                                   by: "Seven",
                                   date: "May 12, 2019",
                                   desc: "Good meme. XP",
                                   link: "https://www.youtube.com/watch?v=J-FLoPrF5co"}, true),
                         new Node({name: "Sweet Dreams Chain [Gen 23] added Ra Ra Rasputin clap and now you can hear Sweet Dreams",
                                   by: "Circvmingo",
                                   date: "May 12, 2019",
                                   desc: "Ra Ra Rasputin, lover of the Russian queen.",
                                   link: "https://www.youtube.com/watch?v=sDGa2ceI_2I"}, true),
                         new Node({name: "The Sweet Dreams Kahoot Meme But I Added Space Jam (Gen 24)",
                                   by: "Kenny888081",
                                   date: "May 12, 2019",
                                   desc: "Come on and slam, if you want to jam...",
                                   link: "https://www.youtube.com/watch?v=2RDwjqXhwpU"}, true),
                         new Node({name: "(Gen 25)sweet dreams with kahoot music but (...) , but I added a sans and a filmora watermark",
                                   by: "Tackle & Lackle Gaming",
                                   date: "May 12, 2019",
                                   desc: "This is it...!",
                                   link: "https://www.youtube.com/watch?v=vi5kyRbAKdY"}, true),
                         new Node({name: "[Gen 26] Sweet dreams with Kahoot and other stuff then thanos snaps and then hulk re-snaps",
                                   by: "King Yeeter",
                                   date: "May 13, 2019",
                                   desc: "The hardest choices require the strongest wills.",
                                   link: "https://www.youtube.com/watch?v=O2WHh_oIsGE"}, true),
                         new Node({name: "[Gen 27] Sweet Dreams Kahoot but Ricardo learns how to be an Epic Gamer",
                                   by: "Riley DStroyer",
                                   date: "May 14, 2019",
                                   desc: "Epic gamer time. Also note blocks.",
                                   link: "https://www.youtube.com/watch?v=Nt0XKtZei5c"}, true),
                         new Node({name: "(Gen 28) Sweet Dream kahoot but I added SMB cover",
                                   by: "PhanPro39",
                                   date: "May 15, 2019",
                                   desc: "Piano added.",
                                   link: "https://www.youtube.com/watch?v=qj5F8CgZdYw"}, true),
                         new Node({name: "[Gen 29] Sweet Dreams Sweet dreams but I put kahoot music over it, but IT WAS ME, DIO!",
                                   by: "Max OEstribi",
                                   date: "May 16, 2019",
                                   desc: "Muda muda muda.",
                                   link: "https://www.youtube.com/watch?v=CjduMQI8G-4"}, true),
                         new Node({name: "[Gen 30] Sweet Dreams but I put kahoot music over it, but performed by Big Band and Squigly",
                                   by: "Katu-Jan",
                                   date: "May 17, 2019",
                                   desc: "They're from Skullgirls, if you were wondering.",
                                   link: "https://www.youtube.com/watch?v=j4LeWIJLjQE"}, true),
                         new Node({name: "(Gen 31) sweet dreams but read the description",
                                   by: "Dolphiner",
                                   date: "May 17, 2019",
                                   desc: "Gun sync v2.",
                                   link: "https://www.youtube.com/watch?v=7G3NaN7Mq10"}, true),
                         new Node({name: "(Gen 32) Sweet Dreams but I put Kahoot music over it, but I added more stuff, read description",
                                   by: "Kaptain 'merica",
                                   date: "May 20, 2019",
                                   desc: "*slap*",
                                   link: "https://www.youtube.com/watch?v=zh2BkHzqUYU"}, true),
                         new Node({name: "[Gen 33] *clap* *clap* You Ruined the Kahoot Franchise",
                                   by: "Triscuit the Great",
                                   date: "May 21, 2019",
                                   desc: "RIP little borker.",
                                   link: "https://www.youtube.com/watch?v=Kt9ZmwBqgt0"}, true),
                         new Node({name: "[Gen 34] Sweet Dreams but Kahoot but Waluigi and MEOW",
                                   by: "Temmeh8274",
                                   date: "May 22, 2019",
                                   desc: "Does this count as Waluigi in Smash?",
                                   link: "https://www.youtube.com/watch?v=TwqkNPgHy74"}, true),
                         new Node({name: "{Generation 35} Sweet Kahoots; but the despacito spider is here to stay for a while!",
                                   by: "Crimzone",
                                   date: "May 23, 2019",
                                   desc: "OOOOOOoooooooof.",
                                   link: "https://www.youtube.com/watch?v=TdSBXtiuNYc"}, true),
                         new Node({name: "(Gen 36) Sweet Dreams But Kahoot, but Bob Ross is beating the devil out it",
                                   by: "Shrekles",
                                   date: "May 26, 2019",
                                   desc: "Happy little WACK",
                                   link: "https://www.youtube.com/watch?v=QnwLzVSfCJc"}, true),
                         new Node({name: "(Gen 37) Kahoot Sweet Dreams, but with Xylophone",
                                   by: "Everything Feline",
                                   date: "May 28, 2019",
                                   desc: "BEEP BEEP BEEP BE- \"I'M DEFUSING A BOMB, SHUT UP\"",
                                   link: "https://www.youtube.com/watch?v=tDhqR1Je_zc"}, true),
                         new Node({name: "sweet dreams kahoot but there's more cowbell",
                                   by: "A Human/imheretoo",
                                   date: "???",
                                   desc: "More cowbell, with the added mystique of unknown dates! (The author deleted their channel)",
                                   link: "https://www.youtube.com/watch?v=JDV6TZW6AEc"}, true),
                         new Node({name: "(Gen 39) Sweet Dreams but the timelines merge ft everyone (& Miku)",
                                   by: "LesManga Musique",
                                   date: "June 6, 2019",
                                   desc: "An unofficial made official.",
                                   link: "https://www.youtube.com/watch?v=owcEFkXTWHI"}, true),
                         new Node({name: "Sweet Dreams Kahoot [Gen40] but Lobster & I remastered Season 1 & added background dancers",
                                   by: "UnderMineBlox & Lobster",
                                   date: "June 7, 2019",
                                   desc: "A collaboration to fix what once was wrong.",
                                   link: "https://www.youtube.com/watch?v=K1u66y8-kwg"}, true),
                         new Node({name: "Sweet Dreams Kahoot but there’s Dancin' then Pendulum and Minecraft Creeper join in to play [Gen 41]",
                                   by: "DaymanOurSavior",
                                   date: "June 12, 2019",
                                   desc: "Woah, a famous person. Also official Dancin'.",
                                   link: "https://www.youtube.com/watch?v=QY-ijEgVU4s"}, true),
                         new Node({name: "(Gen 42) Sweet Dreams but it’s the answer to life, the universe, and everything &My Singing Monsters",
                                   by: "PieMan12",
                                   date: "June 15, 2019",
                                   desc: "Hey, it's a magic number. And also monsters singing. (with cool lights)",
                                   link: "https://www.youtube.com/watch?v=mETmN4BMed0"}, true),
                         new Node({name: "Sweet Dreams Kahoot but Keanu Reeves, Soulja Boy, and more join the battle. (Gen 43)",
                                   by: "Mix N Mash",
                                   date: "June 19, 2019",
                                   desc: "You're breathtaking!",
                                   link: "https://www.youtube.com/watch?v=Jl5qMI3mXqc"}, true),
                         new Node({name: "sweet dreams but i added kitchen gun & don’t mine at night (Gen 44)",
                                   by: "Velamy",
                                   date: "June 29, 2019",
                                   desc: "New viewers will say: \"I'm scared... oh well.\" Or maybe just \"I'm scared.\"",
                                   link: "https://www.youtube.com/watch?v=LG_eLZGDVX0"}, true),
                         new Node({name: "Sweet Dreams but Eleanor Forte, Pingu, Billie Eilish and Miles Morales join in + more (Gen 45)",
                                   by: "StardustLegend",
                                   date: "July 5, 2019",
                                   desc: "Another virtual singer joins the fray.",
                                   link: "https://www.youtube.com/watch?v=m4zLjgfd71Q"}, true),
                         new Node({name: "(Gen 46) Sweet Dreams Kahoot but it has more JoJo",
                                   by: "Kubabuba3",
                                   date: "July 11, 2019",
                                   desc: "Uhhh, muda muda or whatever? Look, I haven't watched Jojo yet.",
                                   link: "https://www.youtube.com/watch?v=UdrYjmlB9K8"}, true),
                         new Node({name: "Sweet Dreams Kahoot gen 47 but It's-a Mario Time (Wahoo!)",
                                   by: "Cloud the Ampharos",
                                   date: "July 16, 2019",
                                   desc: "I guess Cloud here got a 1-up or something, to be here again.",
                                   link: "https://www.youtube.com/watch?v=2jDrUzYsFU0"}, true),
                         new Node({name: "Kahoot Sweet Dreams but it's Buddy's Bizzare Adventure ft. Kokichi Oma and Banjo Kazooie",
                                   by: "LackedRoom140",
                                   date: "July 20, 2019",
                                   desc: "A totally new person made this gen... That was just a lie! AHAHAHAHAHA!",
                                   link: "https://www.youtube.com/watch?v=-bm2Hfsp_Z8"}, true),
                         new Node({name: "SDK [{Gen 49}] the Nazareth zombies are coming In the snow",
                                   by: "Ganar_2000",
                                   date: "Aug 4, 2019",
                                   desc: "Oh, Plants vs. Zombies, huh? ...Wait. Do I hear...Snow Halation???",
                                   link: "https://www.youtube.com/watch?v=TYWO9mFCL40"}, true),
                         new Node({name: "SD̡K [Ge̵n͠ 5̨0]͢ ͞bu͏t̢ ͠{A fatal exception 0E has occured at 0028:C562F1B7 in VXD ctpci9x(05)}",
                                   by: "Everything Feline",
                                   date: "Aug 8, 2019",
                                   desc: "Hmm, maybe I shouldn't've downloaded \"FREE Kahoot HACK111 INFINITE PoINTS11111.exe\"...",
                                   link: "https://www.youtube.com/watch?v=KCYbLTQ2dVo"}, true),
                         new Node({name: "(Gen 51) Sweet Dreams Kahoot but Donald Trump is a bad maestro",
                                   by: "Kaptein 'merica",
                                   date: "Aug 10, 2019",
                                   desc: "I'm pretty sure conductors have batons...",
                                   link: "https://www.youtube.com/watch?v=gwMJD1McIP8"}, true),
                         
                         
                         
                         
                         
                         /* unofficial starts now. Index is currently 52?*/
                         
                         
                         
                         
                         
                         new Node({name: "Sweet dreams with kahoot theme, fixed tempo & Jokers gun & tainted love & etc i put bona-petite",
                                   by: "Kªkº",
                                   date: "May 8, 2019",
                                   desc: "They're from My Singing Monsters.",
                                   link: "https://www.youtube.com/watch?v=DnhwnPDfP88"}), // 52
                         new Node({name: "sweet dreams with kahoot theme, Jokers gun, tainted love, etc but I added the We Will Rock You beat",
                                   by: "Brendan Head",
                                   date: "May 9, 2019",
                                   desc: "We will we will rock you.",
                                   link: "https://www.youtube.com/watch?v=nD5tcrnopj8"}), // 53
                         new Node({name: "\"\"sweet dreams but i put kahoot music over it\" but I fixed the tempo\" but i added lyrics",
                                   by: "Shirafriend",
                                   date: "May 3, 2019",
                                   desc: "Lyrics!",
                                   link: "https://www.youtube.com/watch?v=2Mmbxb-wavM"}), // 54
                         new Node({name: "\"sweet dreams but i put kahoot music over it\" but it's going too fast with relaxing noises",
                                   by: "VIVAS-TRAP",
                                   date: "May 5, 2019",
                                   desc: "Just calm down :)",
                                   link: "https://www.youtube.com/watch?v=a5QODegIPa8"}), // 55
                         new Node({name: "Sweet Dreams Kahoot but Etika has a mental breakdown",
                                   by: "Lobster_",
                                   date: "May 15, 2019",
                                   desc: "OH MY GOOOOD!!!!",
                                   link: "https://www.youtube.com/watch?v=IIKhv1q2dJc"}), // 56
                         new Node({name: "sweet dreams with kahoot music, but as a ytpmv recreation (unofficial)",
                                   by: "Katu-Jan",
                                   date: "May 15, 2019",
                                   desc: "How to get 10000000000000 billion points in Kahoot!!!",
                                   link: "https://www.youtube.com/watch?v=h6FQPZ-gvlY"}), // 57
                         new Node({name: "Sweet Dreams Kahoot: Genesis",
                                   by: "Lobster_",
                                   date: "May 17, 2019",
                                   desc: "...Parent is from last avatar shown.",
                                   link: "https://www.youtube.com/watch?v=AfymBKBKEzc"}), // 58
                         new Node({name: "Sweet Dreams and Kahoot Music sounds SO GOOD Together!",
                                   by: "Amosdoll Music",
                                   date: "May 11, 2019",
                                   desc: "Nice.",
                                   link: "https://www.youtube.com/watch?v=vMddc1xlMzo"}), // 59
                         new Node({name: "sweet dreams but with kahoot music over it,crab rave,tainted love,men at work and my previous crap",
                                   by: "theonlycatonice",
                                   date: "May 10, 2019",
                                   desc: "Lots of stuff. Also, *slap*",
                                   link: "https://www.youtube.com/watch?v=XMZ7xAhzC0g"}), // 60
                         new Node({name: "Sweet Dreams but please read the description (ft. Hatsune miku)",
                                   by: "LesManga Musique",
                                   date: "May 11, 2019",
                                   desc: "Please, read the description.",
                                   link: "https://www.youtube.com/watch?v=vKyrGfcqEIM"}), // 61
                         new Node({name: "Sweet Dreams but please read the description (ft. Hatsune miku) But I added the Pelones",
                                   by: "Loch Ness from Earthbound",
                                   date: "May 13, 2019",
                                   desc: "Violin Pelone.",
                                   link: "https://www.youtube.com/watch?v=sA-NWQkuyAk"}), // 62
                         new Node({name: "Sweet Dreams with Kahoot music but read the discription",
                                   by: "Eileen Gamer Girl",
                                   date: "May 17, 2019",
                                   desc: "Dancin' (Kirby).",
                                   link: "https://www.youtube.com/watch?v=jiW03Z8Tx6M "}), // 63
                         new Node({name: "Sweet Dreams but I beg you, read the description",
                                   by: "Athali",
                                   date: "May 16, 2019",
                                   desc: "All aboard.",
                                   link: "https://www.youtube.com/watch?v=WhsAabTDhUI"}), // 64
                         new Node({name: "Sweet dreams but read the description really hard",
                                   by: "TheJosiahTurner",
                                   date: "May 16, 2019",
                                   desc: "Hats?",
                                   link: "https://www.youtube.com/watch?v=Z9LIfs3-WBQ"}), // 65
                         new Node({name: "sweet dreams kahoot theme, Jokers gun, TL clap & the crab rave shaker but I added a creeper",
                                   by: "Squiggly",
                                   date: "May 8, 2019",
                                   desc: "ssssss....",
                                   link: "https://www.youtube.com/watch?v=WwaP3rlwYQM"}), // 66
                         new Node({name: "sweet dreams kahoot theme, Jokers gun, TL clap, crab rave shaker & creeper but with 100% more OOF",
                                   by: "Data Wireframe",
                                   date: "May 10, 2019",
                                   desc: "This meme is going to OOF itself.",
                                   link: "https://www.youtube.com/watch?v=rwCiqWYKLU4"}), // 67
                         new Node({name: "sweet dreams kahoot, jokers gun, TL clap, crab rave, creeper and oof but i added the game cube sound",
                                   by: "MinoesTrashRat",
                                   date: "May 11, 2019",
                                   desc: "Starting up...",
                                   link: "https://www.youtube.com/watch?v=x4jUgaHjtvs"}), // 68
                         new Node({name: "Sweet dreams but oh my god what have i done (check the description)",
                                   by: "StardustLegend - TheFirstNoel",
                                   date: "May 15, 2019",
                                   desc: "The last thing you want in your burger is Space Jam.",
                                   link: "https://www.youtube.com/watch?v=-vUERdlRA_U"}), // 69
                         new Node({name: "sweet dreams & kahoot theme & gun & clap & crab rave & hawaii five-o drums & I added door head hit",
                                   by: "itor",
                                   date: "May 11, 2019",
                                   desc: "Ouch.",
                                   link: "https://www.youtube.com/watch?v=C1SNCpDizdA"}), // 70
                         new Node({name: "sweet dreams with the kahoot theme ft. an otamatone but read the desc.",
                                   by: "SHIROKAMI",
                                   date: "May 8, 2019",
                                   desc: "Audio itself came from TheRealSullyG.",
                                   link: "https://www.youtube.com/watch?v=nEZEv90qQRc"}), // 71
                         new Node({name: "sweet dreams, kahoot, joker, tainted love, crab rave, and otamatone PLUS squidward's sculpture",
                                   by: "Cheesy Hfj",
                                   date: "May 11, 2019",
                                   desc: "RIP Squidward.",
                                   link: "https://www.youtube.com/watch?v=Va3mJUTMP94"}), // 72
                         new Node({name: "Sweet Dreams but Read the Description",
                                   by: "The guy across the street",
                                   date: "May 17, 2019",
                                   desc: "It's a merger. It's really something.",
                                   link: "https://www.youtube.com/watch?v=3tPhBBjUMJc"}), // 73
                         new Node({name: "Sweet Dreams But Only The Description Can Express The Insanity At Work",
                                   by: "Karuu",
                                   date: "May 15, 2019",
                                   desc: "Harder, Better, Faster, Stronger.",
                                   link: "https://www.youtube.com/watch?v=8VQrkCCGoZQ"}), // 74
                         new Node({name: "Sweet Dreams but we need to go deeper",
                                   by: "Audioshake",
                                   date: "May 15, 2019",
                                   desc: "Brainiac Maniac is the song added.",
                                   link: "https://www.youtube.com/watch?v=SL_tgSO5Jgo"}), // 75
                         new Node({name: "Sweet Dreams But I Made It ♂The♂Right♂Version♂",
                                   by: "JoeCrapsArt",
                                   date: "May 19, 2019",
                                   desc: "From Gachimuchi. The MEME, not the GAME. I hope.",
                                   link: "https://www.youtube.com/watch?v=ipqDq0kfnc8"}), // 76
                         new Node({name: "sweet dreams but i put kahoot music over it but I fixed the tempo but the rest is in the description",
                                   by: "Crash Schwarzenegger",
                                   date: "May 8, 2019",
                                   desc: "Dancin' memefest.",
                                   link: "https://www.youtube.com/watch?v=hK-vpj7E9O8"}), // 77
                         new Node({name: "Sweet Dreams but i put kahoot music over it but I fixed the tempo but I put in Smug dancing Hat kid",
                                   by: "Crash Schwarzenegger",
                                   date: "May 7, 2019",
                                   desc: "Lonely smug dancin'.",
                                   link: "https://www.youtube.com/watch?v=NdSW5LQbAAA"}), // 78
                         new Node({name: "sweet dreams with kahoot music, but as a ytpmv recreation (part 2) (unofficial)",
                                   by: "Katu-Jan",
                                   date: "July 28, 2019",
                                   desc: "It's the Season 2 Review.",
                                   link: "https://www.youtube.com/watch?v=5HhHiaUx5FY"}) // 80
                        ]); // please ACTUALLY define mainTree here once everything works
    function findIndex(name) {
      for(var i = 0; i < mainTree.nodes.length; i++) {
        if(name === mainTree.nodes[i].meta.name) {
          return i;
        }
      }
    }
    var unofficialParents = [
                             5, 
                             "Sweet dreams with kahoot theme, fixed tempo & Jokers gun & tainted love & etc i put bona-petite", 
                             2, 
                             1, 
                             28, 
                             25, 
                             29, 
                             1, 
                             5, 
                             "sweet dreams but with kahoot music over it,crab rave,tainted love,men at work and my previous crap", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku) But I added the Pelones", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             5, 
                             "sweet dreams kahoot theme, Jokers gun, TL clap & the crab rave shaker but I added a creeper", 
                             "sweet dreams kahoot theme, Jokers gun, TL clap, crab rave shaker & creeper but with 100% more OOF", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             6, 
                             5, 
                             "sweet dreams with the kahoot theme ft. an otamatone but read the desc.", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             "Sweet Dreams but please read the description (ft. Hatsune miku)", 
                             "Sweet Dreams But Only The Description Can Express The Insanity At Work", 
                             "Sweet Dreams But Only The Description Can Express The Insanity At Work", 
                             2, 
                             2,
                             45
                            ];
    for(var i = 0; i < unofficialParents.length; i++) {
      if(Number.isInteger(unofficialParents[i])) {
        mainTree.nodes[mainTree.nodes.length + ((-1 * unofficialParents.length) + i)].par = mainTree.nodes[unofficialParents[i]];
      } else {
        mainTree.nodes[mainTree.nodes.length + ((-1 * unofficialParents.length) + i)].par = mainTree.nodes[findIndex(unofficialParents[i])];
      }
    }
    
    for(var i = 0; i < mainTree.nodes.length; i++) {
      if(mainTree.nodes[i].off) {
        mainTree.nodes[i].par = mainTree.nodes[i - 1];
      }
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
    gen3Rect.setAttributeNS(null, "y", "" + (((100 * genY + 2 * nodeRadius) / 2) - yOffset)); // I had originally assumed that season 2's snap would be gen 51; this was not the case. No idea why I need to subtract yOffset though, which is a bad sign.
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
    var season1Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    season1Text.setAttributeNS(null, "text-anchor", "end");
    season1Text.style.fontSize = "40px";
    season1Text.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17));
    season1Text.setAttributeNS(null, "y", "" + (1 * genY + yOffset + nodeRadius + 30));
    season1Text.textContent = "Season 1";
    var season2Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    season2Text.setAttributeNS(null, "text-anchor", "end");
    season2Text.style.fontSize = "40px";
    season2Text.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17));
    season2Text.setAttributeNS(null, "y", "" + (26 * genY + yOffset + nodeRadius + 30));
    season2Text.textContent = "Season 2";
    var season3Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    season3Text.setAttributeNS(null, "text-anchor", "end");
    season3Text.style.fontSize = "40px";
    season3Text.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17));
    season3Text.setAttributeNS(null, "y", "" + (50 * genY + yOffset + nodeRadius + 30));
    season3Text.textContent = "Season 3";
    var season4Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    season4Text.setAttributeNS(null, "text-anchor", "end");
    season4Text.style.fontSize = "40px";
    season4Text.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17));
    season4Text.setAttributeNS(null, "y", "" + (76 * genY + yOffset + nodeRadius + 30));
    season4Text.textContent = "Season 4";
    svg.appendChild(season1Text);
    svg.appendChild(season2Text);
    svg.appendChild(season3Text);
    svg.appendChild(season4Text);
    var season1Logo = document.createElementNS("http://www.w3.org/2000/svg", "image");
    season1Logo.setAttributeNS(null, "height", "" + genY / 2);
    season1Logo.setAttributeNS(null, "width", "" + (2560 * genY / 2 / 1440));
    season1Logo.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17 - season1Logo.getAttributeNS(null, "width")));
    season1Logo.setAttributeNS(null, "y", "" + (1 * genY + yOffset + nodeRadius + 30));
    season1Logo.setAttributeNS(null, "href", "images/season1.png");
    var season2Logo = document.createElementNS("http://www.w3.org/2000/svg", "image");
    season2Logo.setAttributeNS(null, "height", "" + genY / 2);
    season2Logo.setAttributeNS(null, "width", "" + (4961 * genY / 2 / 3508));
    season2Logo.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17 - season2Logo.getAttributeNS(null, "width")));
    season2Logo.setAttributeNS(null, "y", "" + (26 * genY + yOffset + nodeRadius + 30));
    season2Logo.setAttributeNS(null, "href", "images/season2.png");
    var season3Logo = document.createElementNS("http://www.w3.org/2000/svg", "image");
    season3Logo.setAttributeNS(null, "height", "" + genY / 2);
    season3Logo.setAttributeNS(null, "width", "" + (1280 * genY / 2 / 720));
    season3Logo.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17 - season3Logo.getAttributeNS(null, "width")));
    season3Logo.setAttributeNS(null, "y", "" + (50 * genY + yOffset + nodeRadius + 30));
    season3Logo.setAttributeNS(null, "href", "images/season3.png");
    svg.appendChild(season1Logo);
    svg.appendChild(season2Logo);
    svg.appendChild(season3Logo);
    for(var i = 0; i < highGen + 1; i++) {
      var newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      newLine.setAttributeNS(null, "x1", "0");
      newLine.setAttributeNS(null, "y1", "" + (i * genY + yOffset + nodeRadius));
      newLine.setAttributeNS(null, "x2", "" + svg.getAttributeNS(null, "width"));
      newLine.setAttributeNS(null, "y2", "" + (i * genY + yOffset + nodeRadius));
      newLine.setAttributeNS(null, "stroke", "black");
      svg.appendChild(newLine);
      var genText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      genText.setAttributeNS(null, "text-anchor", "end");
      genText.style.fontSize = "20px";
      genText.setAttributeNS(null, "x", "" + (svg.getAttributeNS(null, "width") - 17));
      genText.setAttributeNS(null, "y", "" + (i * genY + yOffset + nodeRadius - 3));
      genText.textContent = "Gen " + i;
      svg.appendChild(genText);
      // create SVG elements
    }
    document.getElementById("mainDiv").appendChild(svg);
    
    mainTree.display();
  }
}

setup();
