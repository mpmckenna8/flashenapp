
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
setUpLayerSelect( flash )


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

// setup things

setUp_ui( sendToFlaschen, settings, flash, imgi, keepsending )

setup_svg( settings );

setupInput( imgi, settings, renderGIF, settings.c, settings.gifCanvas, playpause, renderFrame )
