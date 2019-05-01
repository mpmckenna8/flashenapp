// a function to sample the canvas then send the stuff to flashentaschen

function canToFlashen (imgdat, settings, sendToFlaschen) {

  var imageWidth = imgdat.width
  var imageHeight = imgdat.height

  var xoff = Math.floor(imageWidth / settings.screenWidth)

  var yoff = Math.floor(imageHeight / settings.screenHeight)

// each x picwel we need to go four through * imageWidth/screenHeight
  for (let y = 0; y < settings.screenHeight; y++) {
    for (let x = 0; x < settings.screenWidth; x++) {
      var indi = ((xoff) * x * 4 + (yoff * imageWidth) * y * 4)

      settings.pixels[x + y * settings.screenWidth].color = [imgdat.data[indi],
        imgdat.data[indi + 1], imgdat.data[indi + 2]]
    }
  }

  sendToFlaschen(settings.pixels, flash)
}

module.exports = canToFlashen;
