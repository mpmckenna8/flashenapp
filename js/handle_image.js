// do stuff
// is used in render frame for gifs
// also called each time an image is loaded.
function flashenSvg ( pxwidth, pxheight, settings, sendToFlaschen, drawFlash ) {


  var imgdat = settings.ct.getImageData(0, 0, pxwidth, pxheight)


  canvas_to_flash( imgdat, settings, sendToFlaschen )


  drawFlash(  settings )

}

module.exports = flashenSvg;
