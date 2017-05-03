var flash = require('flaschenode');
var d3 = require('d3');
var pixel = require('./pixer.js');

var refreshDelay = 500;

flash.layer = 15;
flash.init();
console.log(flash.hostname)

var datb = Buffer.alloc( flash.headerString().length+ flash.footerString().length + flash.height* flash.width*3)

flash.data = datb;

datb.write(flash.headerString(), 0);
var starfoo = datb.length - flash.footerString().length
datb.write(flash.footerString(), starfoo);


var src = "https://static.pexels.com/photos/17767/pexels-photo.jpg";
let svg;

console.log('new try with src, ', src)
var counter = 0;


var viz = {} //new image('#visualization', null, [src], {hullAlgorithm: 'convex'});


var imgi = new Image();

// handle when an image is loaded.
imgi.onload = function () {
  canny.width = imgi.width;
  canny.height = imgi.height

  //  eightBit(document.getElementById('mycanvas'), img, 114);
  ct.drawImage(imgi, 0, 0);
  //  console.log(ct.getImageData(0, 0, img.width, img.height))
  flashenSvg();
  //  canToFlashen(ct.getImageData(0, 0, img.width, img.height));
};

imgi.src =  'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg'//'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';
//console.log(img)

var remote = require('electron').remote;
var fs = require('fs');

window.addEventListener('keydown',function(e){
 console.log('keycode=', e.keyCode);
    if(e.keyCode == 80) console.log('pressed save thing') //save();
    else if(e.keyCode == 70){
      const footer = new Buffer(flash.footerString())
      var srcData = src;
      var allcon; // to hold the final buffer to send
    }
  })


var screenWidth;
var screenHeight;
var width = 15;
var height = 15;
var pixels;

function flashenSvg(){

    svg = d3.select('#flashsvg');
    screenWidth= 45;
    screenHeight = 35;
    svg.attr('width',width*screenWidth) ;
    svg.attr('height', screenHeight*height)

    svg.style("background-color", "pink")

    pixels = [];

    for(y = 0; y < screenHeight; y++){
      for(x=0; x < screenWidth; x++){
      //  console.log(x)
        pixels.push(new pixel(x,y))

      }
    }

    var imgdat = ct.getImageData(0, 0, imgi.width, imgi.height)

    canToFlashen(imgdat);

    drawFlash(pixels)

}


var canny = document.getElementById('mycanvas')
var ct = canny.getContext('2d')
//console.log(ct.getImageData(0, 0, 200, 200))

function drawFlash(data){

  svg.selectAll('rect').remove();

    var pixs = svg.selectAll('rect')
      .data(data)

    pixs.enter().append('rect')
      .attr('x', function(d){
    //  console.log(d)
        return width*d.xin ;
      })
      .attr("width", width)
        .attr("height", height)
      .attr('y', function(d){
        return height*d.yin;
      })
      .attr('id', function(d){
        return 'p'+d.xin + '-'+d.yin
      })
      .attr('d', function(d){
        return JSON.stringify(d);
      })
      .attr('stroke', 'blue')
      .attr('fill', function(d){
      //  console.log(d.color)
        return d3.rgb(d.color[0], d.color[1], d.color[2])
      })

}

// my kind of lazy sampling of the canvas
function canToFlashen(imgdat){
  var imageWidth = imgdat.width;
  var imageHeight = imgdat.height;

  var xoff = Math.floor(imageWidth/screenWidth);

  var yoff = Math.floor(imageHeight/screenHeight);

// each x picwel we need to go four through * imageWidth/screenHeight
  for(y = 0; y < screenHeight; y++){
    for(x=0; x < screenWidth; x++){
        var indi = ((xoff) * x * 4 +  (yoff * imageWidth)*y*4 )

        //counter= counter+1;
        pixels[x + y*screenWidth].color = [imgdat.data[indi],
                                      imgdat.data[indi+1], imgdat.data[indi+2]]
    }
  }
  sendToFlaschen(pixels)
}



function setupInput(){
  var linkinput = d3.select('#linkin');
  linkinput.on('keydown', function(err,d ,e){

    var linkinput = d3.select('#linkin');
    console.log('and this val on keydown is, ', this.value)
  })
  //console.log(linkinput.value)
  linkinput.attr('value', imgi.src);
}


// Handle the action of setting a new image source.
d3.select('#urlbut')
  .on('click', function(d){
    var linkinpu = d3.select('#linkin');
  //  var newlink = linkinpu.attr('value')
    //  console.log('update image with', linkinpu[0][0].value, newlink)
    imgi.src = document.getElementById('linkin').value;

  })

// Handle click on the button to update the flashentaschen
d3.select('#updateBut')
  .on('click', function(d){
    sendToFlaschen(pixels)
  })

// When the check box if checkeud handle refreshing the flashentaschen or not
d3.select('#contcheck')
  .on('change', function(d, i){
    console.log('checkedout', d, this.checked)
    flashenSvg();

    if( this.checked ){
      keepsending();
     }

  })

function keepsending() {
  flashenSvg();
//  console.log('is it still checked', d3.select('#contcheck')[0][0].checked)
  setTimeout(function(elap){
    if( !(d3.select('#contcheck')[0][0].checked) ){
      // t.stop();
      console.log('stoping the refresh')
     }
    else{
      keepsending();
    }
  }, refreshDelay)
}


function sendToFlaschen(data){
    //console.log("Got info from the client it is: " + data);
    var data = data //.split('\n');
    for(d of data){
      try{
      //  var djson = JSON.parse(d);
      //  console.log(djson.xin, djson.yin )
        var color = d.color;
        flash.set(d.xin, d.yin, color);
      }
      catch(e){
        console.log(e)
      }
    }
    flash.show();
  }

// basic flow of the app
// set up text input and will load and show inital image
setupInput();
