
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
let drawFlash = require('./js/draw_flaschen.js');

let playpause = require('./js/playpause.js')

let manipulate = require('./js/manipulate.js');

let sendToFlaschen = require( './js/send_to_flaschen.js' )
let canvas_to_flash = require('./js/canvas_to_flaschen.js')
let keepsending = require('./js/keep_sending_to_flash.js')
let loadGIF = require('./js/load_gif.js')
let settings = require('./js/settings.js');

let setup_text_input = require('./js/setup_text_input.js') (settings)
let setupInput = require('./js/setup_url_input.js')


let flashenSvg = require('./js/handle_image.js')

initFlash(flash)



var display_canvas = document.getElementById('mycanvas')
var ct = display_canvas.getContext('2d')

let imgi = image( display_canvas, ct, flashenSvg, sendToFlaschen );



// a gig link
var src = 'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg'
// "https://media.giphy.com/media/SM32alLW9WEYo/giphy.gif"

// taco cat picture
//'https://static.pexels.com/photos/17767/pexels-photo.jpg'

// layerselect part trying to separate out
setUpLayerSelect( flash )


imgi.src = src
// 'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';

setup_svg( settings );


setUp_ui( sendToFlaschen, settings, flash, imgi, ct, keepsending )



// basic flow of the app
// set up text input and will load and show inital image and allow all the
// stuff to work
setupInput( imgi, gif, settings, renderGIF )


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

  var gif;




  function renderGIF(frames){
  	settings.loadedFrames = frames;
  //  console.log('frames = ', frames)
  	settings.frameIndex = 0;
//    console.log('framcs width supposedly,', frames[0].dims.width)

    	c.width = frames[0].dims.width;
    	c.height = frames[0].dims.height;

    	gifCanvas.width = c.width;
    	gifCanvas.height = c.height;

    	if(!settings.playing){
    		playpause(settings, renderFrame);
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
  	var frame = settings.loadedFrames[settings.frameIndex];
  	var start = new Date().getTime();

  	gifCtx.clearRect(0, 0, c.width, c.height);
  	// draw the patch
  	drawPatch(frame);

  	// perform manipulation
  	manipulate(gifCanvas, gifCtx, settings);

  	// update the frame index
    if( settings.loadedFrames.length ){

    	settings.frameIndex++;
    	if(settings.frameIndex >= settings.loadedFrames.length){
    		settings.frameIndex = 0;
    	}

    	var end = new Date().getTime();
    	var diff = end - start;

    	if(settings.playing){
    		// delay the next gif frame
        flashenSvg(c.width, c.height, ct, settings, sendToFlaschen, drawFlash);

    		setTimeout(function(){
    			renderFrame()//requestAnimationFrame(renderFrame);
    		}, Math.max(0, Math.floor(frame.delay - diff)));
    	}
    }
  }
