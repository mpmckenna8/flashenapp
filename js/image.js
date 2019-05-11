// do all the image stuff here

module.exports  = function( display_canvas, ct, flashenSvg, sendToFlaschen ) {
  let imager = new Image();

  // handle when an image is loaded.
  imager.onload = function () {
    console.log('image loaded')
    // set the canvas hight and width to that of the picture.
    display_canvas.width = imager.width
    display_canvas.height = imager.height
    // draws the imabe to the canvas
    ct.drawImage(imager, 0, 0)

    var imgdat = ct.getImageData(0, 0, imager.width, imager.height)


    //console.log('should be adding text', display_text)
    // adds text to an image, doesn't work for gifs and stuff here
  //  add_text( setings.display_text.text, ct, display_canvas, settings.display_text.x_offset , settings.display_text.y_offset,  settings.display_text.size )

  //  add_text('over', ct, display_canvas, 0,200, settings.display_text.size)

    flashenSvg( imager.width, imager.height, ct, settings, sendToFlaschen, drawFlash );

  }

  return imager;
}
