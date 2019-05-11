// function to manipulate imageSmoothingEnabled

  var edge = require('./edge.js')
  var invert = require('./invert.js')
  var grayscale = require('./greyscale.js')


function manipulate(gifCanvas, gifCtx, settings) {

  var imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
  var other = gifCtx.createImageData(gifCanvas.width, gifCanvas.height);

  if( settings.bEdgeDetect ){
    imageData = edge(imageData.data, other);
  }

  if(settings.bInvert){
    invert(imageData.data);
  }

  if(settings.bGrayscale){
    grayscale(imageData.data);
  }

  // do pixelation
  var pixelsX = 5 + Math.floor(settings.pixelPercent / 100 * (c.width - 5));
  var pixelsY = (pixelsX * c.height) / c.width;

  if(settings.pixelPercent != 100){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }


  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, pixelsX, pixelsY);
  ctx.drawImage(c, 0, 0, pixelsX, pixelsY, 0, 0, c.width, c.height);

}


module.exports = manipulate;
