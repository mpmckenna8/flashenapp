
// new stuff starts here
var flash = require('flaschenode')
var d3 = require('d3')


let initFlash = require('./initflash.js')
let setUpLayerSelect = require('./js/setuplayerselect.js')
let handle_key_press = require('./js/handle_key_press.js')
let setup_svg = require('./js/setup_svg.js')
let add_text = require('./js/addtext.js')
let image = require('./js/image.js')
let setupInput = require('./js/setup_url_input.js')


let settings = require('./js/settings.js');

let setup_text_input = require('./js/setup_text_input.js') (settings)



initFlash(flash)

var canny = document.getElementById('mycanvas')
var ct = canny.getContext('2d')

let imgi = image();



// a gig link
var src = 'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg'
// "https://media.giphy.com/media/SM32alLW9WEYo/giphy.gif"

// taco cat picture
//'https://static.pexels.com/photos/17767/pexels-photo.jpg'

// layerselect part trying to separate out
setUpLayerSelect( flash )


// handle when an image is loaded.


imgi.onload = function () {

  console.log('image loaded')
  canny.width = imgi.width
  canny.height = imgi.height
  ct.drawImage(imgi, 0, 0)
  //console.log('should be adding text', display_text)

  // adds text to an image, doesn't work for gifs and stuff here
//  add_text( setings.display_text.text, ct, canny, settings.display_text.x_offset , settings.display_text.y_offset,  settings.display_text.size )

//  add_text('over', ct, canny, 0,200, settings.display_text.size)
  flashenSvg(imgi.width, imgi.height);

}


imgi.src = src
// 'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';


// This is for when you upload a file from your filesystem
var inputElement = document.getElementById('fileuploader')


inputElement.addEventListener('change', handleFiles, false)

function handleFiles (e) {

  console.log('nnoooooo')
  console.log('handling files', e)
  var fileList = this.files

  /* now you can work with the file list */
  console.log( fileList )
  imgi.src = window.URL.createObjectURL(fileList[0])

}


setup_svg( settings );



function flashenSvg (pxwidth, pxheight) {

  var imgdat = ct.getImageData(0, 0, pxwidth, pxheight)

  canToFlashen(imgdat)

  drawFlash(settings.pixels)

}

// console.log(ct.getImageData(0, 0, 200, 200))
function drawFlash (data) {
  console.log('drawFlash running,', data)
  settings.svg.selectAll('rect').remove()

  var pixs = settings.svg.selectAll('rect')
      .data(data)

  pixs.enter().append('rect')
      .attr('x', function (d) {
    //  console.log(d)
        return settings.svg_pixel_width * d.xin
      })
      .attr('width', settings.svg_pixel_width)
      .attr('height', settings.svg_pixel_height)
      .attr('y', function (d) {
        return settings.svg_pixel_height * d.yin
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

  var xoff = Math.floor(imageWidth / settings.screenWidth)

  var yoff = Math.floor(imageHeight / settings.screenHeight)

// each x picwel we need to go four through * imageWidth/screenHeight
  for (let y = 0; y < settings.screenHeight; y++) {
    for (let x = 0; x < settings.screenWidth; x++) {
      var indi = ((xoff) * x * 4 + (yoff * imageWidth) * y * 4)

        // counter= counter+1;
      settings.pixels[x + y * settings.screenWidth].color = [imgdat.data[indi],
        imgdat.data[indi + 1], imgdat.data[indi + 2]]
    }
  }
  sendToFlaschen(settings.pixels)
}




// Handle click on the button to update the flashentaschen
d3.select('#updateBut')
  .on('click', function (d) {
    sendToFlaschen(settings.pixels)
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
  }, settings.refreshDelay)
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
setupInput( imgi )


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
//    console.log('framcs width supposedly,', frames[0].dims.width)

    	c.width = frames[0].dims.width;
    	c.height = frames[0].dims.height;

    	gifCanvas.width = c.width;
    	gifCanvas.height = c.height;

    	if(!playing){
    		playpause();
    	}

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

  var edge = require('./js/edge.js')
  var invert = require('./js/invert.js')

  var grayscale = require('./js/greyscale.js')

  function manipulate() {

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

  function renderFrame() {
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
