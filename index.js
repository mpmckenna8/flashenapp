
// new stuff starts here
var flash = require('flaschenode')
var d3 = require('d3')
var Pixel = require('./pixer.js')
var refreshDelay = 500

flash.layer = 13
flash.init()

var datb = Buffer.alloc(flash.headerString().length + flash.footerString().length + flash.height * flash.width * 3)

flash.data = datb

datb.write(flash.headerString(), 0)
var starfoo = datb.length - flash.footerString().length
datb.write(flash.footerString(), starfoo)

var src = 'https://static.pexels.com/photos/17767/pexels-photo.jpg'
let svg

console.log('new try with src, ', src)

var imgi = new Image();  // eslint-disable-line

var layers = [];

var src = 'https://static.pexels.com/photos/17767/pexels-photo.jpg'

console.log('new try with src, ', src)

var layers = [];

for (i = 1; i < 16; i++) {
  layers.push(i);
}

console.log(layers)
d3.select('#layerselect') .on('change', function(d){
   console.log('it changed, ', this.value)
   flash.layer = parseInt(this.value);
   datb.write(flash.headerString(), 0);
 }).selectAll('option')
 .data(layers)
 .enter()
 .append('option')
 .attr('value', function(d){
   console.log('d of val', d)
   return d
 })
 .attr('selected', function(d){
   if( d === flash.layer ) {
     return true;
   }
   return false
 })
 .text( (d)=>d )


// handle when an image is loaded.
imgi.onload = function () {
  canny.width = imgi.width
  canny.height = imgi.height

  ct.drawImage(imgi, 0, 0)
  //  console.log(ct.getImageData(0, 0, img.width, img.height))

  flashenSvg(imgi.width, imgi.height);
}

imgi.src = 'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg'// 'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';

window.addEventListener('keydown', function (e) {
  console.log('keycode=', e.keyCode)
  if (e.keyCode === 80) console.log('pressed save thing') // save();
  else if (e.keyCode === 70) {
  //  const footer = new Buffer(flash.footerString())
    console.log('want to make this auto send to the flashentaschen')
  //  var srcData = src
  //  var allcon // to hold the final buffer to send
  }
})

var inputElement = document.getElementById('fileuploader')
inputElement.addEventListener('change', handleFiles, false)

function handleFiles () {
  var fileList = this.files /* now you can work with the file list */
  console.log(fileList)
  imgi.src = window.URL.createObjectURL(fileList[0])
}

var screenWidth= 45
var screenHeight  = 35

var width = 15
var height = 15
var pixels


var canny = document.getElementById('mycanvas')
var ct = canny.getContext('2d')


setUpSvg();

function setUpSvg() {
  svg = d3.select('#flashsvg')

  svg.attr('width', width * screenWidth)
  svg.attr('height', screenHeight * height)

  svg.style('background-color', 'pink')

  pixels = []

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      //  console.log(x)
      pixels.push(new Pixel(x, y))
    }
  }
}

function flashenSvg (pxwidth, pxheight) {

  var imgdat = ct.getImageData(0, 0, pxwidth, pxheight)

  canToFlashen(imgdat)

  drawFlash(pixels)

}

// console.log(ct.getImageData(0, 0, 200, 200))
function drawFlash (data) {
  svg.selectAll('rect').remove()

  var pixs = svg.selectAll('rect')
      .data(data)

  pixs.enter().append('rect')
      .attr('x', function (d) {
    //  console.log(d)
        return width * d.xin
      })
      .attr('width', width)
        .attr('height', height)
      .attr('y', function (d) {
        return height * d.yin
      })
      .attr('id', function (d) {
        return 'p' + d.xin + '-' + d.yin
      })
      .attr('d', function (d) {
        return JSON.stringify(d)
      })
      .attr('stroke', 'blue')
      .attr('fill', function (d) {
      //  console.log(d.color)
        return d3.rgb(d.color[0], d.color[1], d.color[2])
      })
}

// my kind of lazy sampling of the canvas
function canToFlashen (imgdat) {
  var imageWidth = imgdat.width
  var imageHeight = imgdat.height

  var xoff = Math.floor(imageWidth / screenWidth)

  var yoff = Math.floor(imageHeight / screenHeight)

// each x picwel we need to go four through * imageWidth/screenHeight
  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      var indi = ((xoff) * x * 4 + (yoff * imageWidth) * y * 4)

        // counter= counter+1;
      pixels[x + y * screenWidth].color = [imgdat.data[indi],
        imgdat.data[indi + 1], imgdat.data[indi + 2]]
    }
  }
  sendToFlaschen(pixels)
}

function setupInput () {
  var linkinput = d3.select('#linkin')
  linkinput.on('keydown', function (err, d, e) {
  //  var linkinput = d3.select('#linkin');
    if (err) {
      console.log('somehow there was an error on keydown it is, ', err)
    }
    console.log('and d on keydown is, ', d)
  })
  // console.log(linkinput.value)
  linkinput.attr('value', imgi.src)
}



// Handle click on the button to update the flashentaschen
d3.select('#updateBut')
  .on('click', function (d) {
    sendToFlaschen(pixels)
  })

// When the check box if checked handle refreshing the flashentaschen or not
d3.select('#contcheck')
  .on('change', function (d, i) {
    console.log('checkedout', d, this.checked)
    flashenSvg(imgi.width, imgi.height)
    if (this.checked) {
      keepsending()
    }
  })

function keepsending () {
  flash.show();
  //  console.log('is it still checked', d3.select('#contcheck')[0][0].checked)
  setTimeout(function (elap) {
    if (!(document.getElementById('contcheck').checked)) {
      // t.stop();
      console.log('stoping the refresh')
    } else {
      keepsending()
    }
  }, refreshDelay)
}

function sendToFlaschen(data) {
    // console.log("Got info from the client it is: " + data);
  var datum = data // .split('\n');
  for (let d of datum) {
    try {
      //  var djson = JSON.parse(d);
      //  console.log(djson.xin, djson.yin )
      var color = d.color
      flash.set(d.xin, d.yin, color)
    } catch (e) {
      console.log(e)
    }
  }
  flash.show()
}

// this part handles users dropping files into the red box
var dropbox;

dropbox = document.getElementById("filedragspot");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFileDrop(files);

}

function handleFileDropl(filers) {
  var fileList = filers /* now you can work with the file list */
  console.log(filers)
  imgi.src = window.URL.createObjectURL(fileList[0])
}


// basic flow of the app
// set up text input and will load and show inital image and allow all the
// stuff to work
setupInput()

// new stuff ends here

  // user canvas
  var c = document.getElementById( 'mycanvas')
  var ctx = c.getContext('2d');
  // gif patch canvas

  var gifCanvas = document.createElement('canvas');
  var gifCtx = gifCanvas.getContext('2d');
  var tempCanvas = document.createElement('canvas');
  var tempCtx = tempCanvas.getContext('2d')

  var url = document.getElementById('linkin');
  // default gif

  // load the default gif
//  loadGIF();
  var gif;

  // load a gif with the current input url value
  function loadGIF(){
  	var oReq = new XMLHttpRequest();
  	oReq.open("GET", url.value, true);
  	oReq.responseType = "arraybuffer";

  	oReq.onload = function (oEvent) {

  	    var arrayBuffer = oReq.response; // Note: not oReq.responseText
  	    if (arrayBuffer) {
  	        gif = new GIF(arrayBuffer);
  	        var frames = gif.decompressFrames(true);
  	       // console.log(gif);
            //console.log('frames = ', frames)
  	        // render the gif
  	        renderGIF(frames);
  	    }
  	};

  	oReq.send(null);
  }

  var playing = false;
  var bEdgeDetect = false;
  var bInvert = false;
  var bGrayscale = false;
  var pixelPercent = 100;
  var loadedFrames;
  var frameIndex;

  function playpause(){
  	playing = !playing;
  	if(playing){
  		renderFrame();
  	}
  }

  function renderGIF(frames){

  	 loadedFrames = frames;
  //  console.log('frames = ', frames)
  	   frameIndex = 0;
  //  if(frames.dims){
    console.log('framcs width supposedly,', frames[0].dims.width)

    	c.width = frames[0].dims.width;
    	c.height = frames[0].dims.height;

    	gifCanvas.width = c.width;
    	gifCanvas.height = c.height;

    	if(!playing){
    		playpause();
    	}

  //  }
  }

  var frameImageData;

  function drawPatch(frame){
    if(frame ){
    	var dims = frame.dims;

    	if(!frameImageData || dims.width != frameImageData.width || dims.height != frameImageData.height){
    		tempCanvas.width = dims.width;
    		tempCanvas.height = dims.height;
    		frameImageData = tempCtx.createImageData(dims.width, dims.height);
    	}

    	// set the patch data as an override
    	frameImageData.data.set(frame.patch);

    	// draw the patch back over the canvas
    	tempCtx.putImageData(frameImageData, 0, 0);

    	gifCtx.drawImage(tempCanvas, dims.left, dims.top);

    }
  }

  var edge = function(data, output){

  	var odata = output.data;
  	var width = gif.raw.lsd.width;
  	var height = gif.raw.lsd.height;

  	var conv = [-1, -1, -1,
  				-1, 8, -1,
  				-1, -1, -1];
  	var halfside = Math.floor(3/2);

  	for(var y=0; y<height; y++){
  		for(var x=0; x<width; x++){

  			var r=0, g=0, b=0;
  			for(var cy=0; cy<3; cy++){
  				for(var cx=0; cx<3; cx++){

  					var scy = (y - halfside + cy);
  					var scx = (x - halfside + cx);

  					if(scy >= 0 && scy < height && scx >= 0 && scx < width){
  						var src = (scy * width + scx) * 4;
  						var f= cy * 3 + cx;
  						r += data[src] * conv[f];
  						g += data[src + 1] * conv[f];
  						b += data[src + 2] * conv[f];
  					}
  				}
  			}

  			var i = (y * width + x) * 4;
  			odata[i]     = r;
  			odata[i + 1] = g;
  			odata[i + 2] = b;
  			odata[i + 3] = 255;
  		}
  	}

  	return output;
  }

  var invert = function(data) {
  	for (var i = 0; i < data.length; i += 4) {
  		data[i]     = 255 - data[i];     // red
  		data[i + 1] = 255 - data[i + 1]; // green
  		data[i + 2] = 255 - data[i + 2]; // blue
  		data[i + 3] = 255;
  	}
  };

  var grayscale = function(data) {
  	for (var i = 0; i < data.length; i += 4) {
  		var avg = (data[i] + data[i +1] + data[i +2]) / 3;
  		data[i]     = avg; // red
  		data[i + 1] = avg; // green
  		data[i + 2] = avg; // blue
  		data[i + 3] = 255;
  	}
  };

  function manipulate(){
  	var imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
  	var other = gifCtx.createImageData(gifCanvas.width, gifCanvas.height);

  	if(bEdgeDetect){
  		imageData = edge(imageData.data, other);
  	}

  	if(bInvert){
  		invert(imageData.data);
  	}

  	if(bGrayscale){
  		grayscale(imageData.data);
  	}

  	// do pixelation
  	var pixelsX = 5 + Math.floor(pixelPercent / 100 * (c.width - 5));
  	var pixelsY = (pixelsX * c.height) / c.width;

  	if(pixelPercent != 100){
  		ctx.mozImageSmoothingEnabled = false;
  		ctx.webkitImageSmoothingEnabled = false;
  		ctx.imageSmoothingEnabled = false;
  	}

  	ctx.putImageData(imageData, 0, 0);
  	ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, pixelsX, pixelsY);
  	ctx.drawImage(c, 0, 0, pixelsX, pixelsY, 0, 0, c.width, c.height);

  }

  function renderFrame(){
  	// get the frame
  	var frame = loadedFrames[frameIndex];
  	var start = new Date().getTime();

  	gifCtx.clearRect(0, 0, c.width, c.height);
  	// draw the patch
  	drawPatch(frame);

  	// perform manipulation
  	manipulate();

  	// update the frame index
    if( loadedFrames.length ){

    	frameIndex++;
    	if(frameIndex >= loadedFrames.length){
    		frameIndex = 0;
    	}

    	var end = new Date().getTime();
    	var diff = end - start;

    	if(playing){
    		// delay the next gif frame
        flashenSvg(c.width, c.height);

    //    canToFlashen();
    		setTimeout(function(){
    			renderFrame()//requestAnimationFrame(renderFrame);
    		}, Math.max(0, Math.floor(frame.delay - diff)));
    	}
    }
  }



  d3.select('#urlbut')
    .on('click', function(d){
      var linkinpu = d3.select('#linkin');
      var newlink = linkinpu.attr('text')
      playing = false
      var linksplit = document.getElementById('linkin').value;
      console.log(linksplit, 'ender = ',  linksplit.split('.')[linksplit.split('.').length-1])

    //  console.log('update image with', (linkinpu[0][0].value).split('.')[linksplit.length -1])
      if( linksplit.split('.')[linksplit.split('.').length -1] !== 'gif'){
        console.log('thinks its not a gif')
        imgi.src = linksplit;
      }
      else{
      //  imgi.src = linkinpu[0][0].value;
        console.log('need to do gif stuff')
    //    playing = true;
        url.value = linksplit;
        loadGIF()

        //c = canny;
      }

    })
