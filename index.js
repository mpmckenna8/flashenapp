
// new stuff starts here
var flash = require('flaschenode')
var d3 = require('d3')
let Jimp = require('jimp')

let initFlash = require('./initflash.js')
let setUpLayerSelect = require('./js/setuplayerselect.js')
let setUp_ui = require('./js/setup_ui.js')
let handle_key_press = require('./js/handle_key_press.js')
let setup_svg = require('./js/setup_svg.js')
let add_text = require('./js/addtext.js')
let image = require('./js/image.js')
let setupInput = require('./js/setup_url_input.js')
let drawFlash = require('./js/draw_flaschen.js');

let sendToFlaschen = require( './js/send_to_flaschen.js' )
let canvas_to_flash = require('./js/canvas_to_flaschen.js')
let keepsending = require('./js/keep_sending_to_flash.js')

let settings = require('./js/settings.js');

let setup_text_input = require('./js/setup_text_input.js') (settings)


initFlash(flash)



var display_canvas = document.getElementById('mycanvas')
var ct = display_canvas.getContext('2d')

let imgi = image( display_canvas, ct, flashenSvg );



// a gig link
var src = 'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg'
// "https://media.giphy.com/media/SM32alLW9WEYo/giphy.gif"

// taco cat picture
//'https://static.pexels.com/photos/17767/pexels-photo.jpg'

// layerselect part trying to separate out
setUpLayerSelect( flash )
setUp_ui( sendToFlaschen, settings, flash, imgi, ct, keepsending )


imgi.src = src
// 'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';

setup_svg( settings );


function flashenSvg (pxwidth, pxheight, ct) {

  var imgdat = ct.getImageData(0, 0, pxwidth, pxheight)
  canvas_to_flash( imgdat, settings, sendToFlaschen )
  drawFlash( settings.pixels, settings )

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
    if( frame ){

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
        flashenSvg(c.width, c.height, ct);

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
      }

    })
