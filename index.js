
// new stuff starts here
var flash = require('flaschenode')
var d3 = require('d3')
var Pixel = require('./pixer.js')
var refreshDelay = 500

var screenWidth= 45
var screenHeight  = 35

let drawing = false;

let svg = d3.select('#flashsvg')

//var imgi = new Image();  // eslint-disable-line
setUpFlaschen(flash)
set_up_layer_select(flash)

var pixels = setUpSvg(screenWidth, screenHeight);

console.log('pixels after setup', pixels)



sendToFlaschen(pixels)





window.addEventListener('keydown', function (e) {
  console.log('keydown with keycode= ', e.keyCode)
  if (e.keyCode === 80) console.log('pressed save thing') // save();
  else if (e.keyCode === 70) {
  //  const footer = new Buffer(flash.footerString())
    console.log('want to make this auto send to the flashentaschen')
  //  var srcData = src
  //  var allcon // to hold the final buffer to send
  }
})


enableDraw();



function resetPixels() {
  console.log('need to reset pixels')

  let newpixels = [];
  d3.selectAll('rect')
    .attr('fill', 'rbg(1,1,1)')

    for (let y = 0; y < screenHeight; y++) {
      for (let x = 0; x < screenWidth; x++) {
        //  console.log(x)
        newpixels.push(new Pixel(x, y))
      }
    }

    pixels =  newpixels;
    sendToFlaschen(pixels)
}



function enableDraw() {


  d3.selectAll('rect')
    .on('mousedown', (d) => {

      console.log('start drawing', d)
      drawing = true;
    })
    .on('mouseup', (d) => {

      console.log('stop drawing')
      drawing = false;
    })
    .on('mouseover', function(d) {

      console.log(this)
      if(drawing) {
        d3.select(this).attr('fill', 'rgb(250, 250, 250)')

        pixels[d.xin + d.yin*screenWidth].color = [200, 200, 200];
        sendToFlaschen(pixels)

        console.log('want to change the color of ', d)
      }
    })

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




// Handle click on the button to update the flashentaschen
d3.select('#updateBut')
  .on('click', function (d) {
    sendToFlaschen(pixels)
  })

// When the check box if checked handle refreshing the flashentaschen or not
d3.select('#contcheck')
  .on('change', function (d, i) {
    console.log('checkedout', d, this.checked)
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
// new stuff ends here
  // user canvas
  var c = document.getElementById( 'mycanvas')
  var ctx = c.getContext('2d');
  // gif patch canvas

  var gifCanvas = document.createElement('canvas');
  var gifCtx = gifCanvas.getContext('2d');
  var tempCanvas = document.createElement('canvas');
  var tempCtx = tempCanvas.getContext('2d')

  // default gif



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
