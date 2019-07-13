
// new stuff starts here
var flash = require('flaschenode')
var d3 = require('d3')
let Jimp = require('jimp')

var Pixel = require('./pixer.js')


let initFlash = require('./initflash.js')
let setUpLayerSelect = require('./js/setuplayerselect.js')
let setUp_ui = require('./js/setup_ui.js')
let handle_key_press = require('./js/handle_key_press.js')
let setup_svg = require('./js/setup_svg.js')
let add_text = require('./js/addtext.js')
let image = require('./js/image.js')
let drawFlash = require('./js/draw_flaschen.js');
let renderGIF = require('./js/render_gif.js')
let playpause = require('./js/playpause.js')
let drawPatch = require('./js/draw_patch.js')
let manipulate = require('./js/manipulate.js');
let renderFrame = require('./js/render_frame.js')
let sendToFlaschen = require( './js/send_to_flaschen.js' )
let canvas_to_flash = require('./js/canvas_to_flaschen.js')
let keepsending = require('./js/keep_sending_to_flash.js')
let loadGIF = require('./js/load_gif.js')
let settings = require('./js/settings.js');

let setup_text_input = require('./js/setup_text_input.js') (settings)
let setupInput = require('./js/setup_url_input.js')


let flashenSvg = require('./js/handle_image.js')

initFlash(flash)




let imgi = image( settings, flashenSvg, sendToFlaschen );



// a gif link
// "https://media.giphy.com/media/SM32alLW9WEYo/giphy.gif"

// taco cat picture
//'https://static.pexels.com/photos/17767/pexels-photo.jpg'

// layerselect part trying to separate out


imgi.src = settings.src
// 'http://www.dmu.ac.uk/webimages/About-DMU-images/News-images/2014/December/cyber-hack-inset.jpg'//'http://i2.kym-cdn.com/photos/images/newsfeed/000/674/934/422.jpg';

// user canvas
settings.c = document.getElementById( 'mycanvas')

settings.ct = settings.display_canvas.getContext('2d');
settings.ctx = settings.c.getContext('2d');
// gif patch canvas

settings.gifCanvas = document.createElement('canvas');


settings.gifCtx = settings.gifCanvas.getContext('2d');
settings.tempCanvas = document.createElement('canvas');

settings.tempCtx = settings.tempCanvas.getContext('2d')






// basic flow of the app
// set up text input and will load and show inital image and allow all the
// stuff to work

setUpLayerSelect( flash )

// setup things
setup_svg( settings, drawFlash );



setUp_ui( sendToFlaschen, settings, flash, imgi, keepsending )


setupInput( imgi, settings, renderGIF, settings.c, settings.gifCanvas, playpause, renderFrame )




function resetPixels() {
  console.log('need to reset pixels')

  let newpixels = [];
  d3.selectAll('rect')
    .attr('fill', 'rbg(1,1,1)')

    for (let y = 0; y < settings.screenHeight; y++) {
      for (let x = 0; x < settings.screenWidth; x++) {
        //  console.log(x)
        newpixels.push(new Pixel(x, y))
      }
    }

    pixels =  newpixels;
    sendToFlaschen(pixels, flash)

}





function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
