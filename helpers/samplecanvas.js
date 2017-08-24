
// Samples canvas imagedata
function sampleCanvas(imgdat, screenWidth, screenHeight, pixels) {
  let grid = [];
  //console.log(pixels)

    var imageWidth = imgdat.width;
    var imageHeight = imgdat.height;

    var xoff = Math.floor(imageWidth/screenWidth);

    var yoff = Math.floor(imageHeight/screenHeight);


  // each x picwel we need to go four through * imageWidth/screenHeight
    for(y = 0; y < screenHeight; y++){
      for(x=0; x < screenWidth; x++){
          var indi = ((xoff) * x * 4 +  (yoff * imageWidth)*y*4 )
        //  console.log(counter, x, y, indi);
          //counter= counter+1;
          pixels[x + y*screenWidth].color = [imgdat.data[indi], imgdat.data[indi+1], imgdat.data[indi+2]]
      }
    }

}

module.exports = sampleCanvas
