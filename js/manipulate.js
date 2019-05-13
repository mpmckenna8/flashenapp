// function to manipulate imageSmoothingEnabled

  var edge = require('./edge.js')
  var invert = require('./invert.js')
  var grayscale = require('./greyscale.js')


function manipulate(settings) {

  var imageData = settings.gifCtx.getImageData(0, 0, settings.gifCanvas.width, settings.gifCanvas.height);
  var other = settings.gifCtx.createImageData(settings.gifCanvas.width, settings.gifCanvas.height);

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
  var pixelsX = 5 + Math.floor(settings.pixelPercent / 100 * (settings.c.width - 5));
  var pixelsY = (pixelsX * settings.c.height) / settings.c.width;

  if(settings.pixelPercent != 100){
    settings.ctx.mozImageSmoothingEnabled = false;
    settings.ctx.webkitImageSmoothingEnabled = false;
    settings.ctx.imageSmoothingEnabled = false;
  }


  settings.ctx.putImageData(imageData, 0, 0);
  settings.ctx.drawImage(settings.c, 0, 0, settings.c.width, settings.c.height, 0, 0, pixelsX, pixelsY);
  settings.ctx.drawImage(settings.c, 0, 0, pixelsX, pixelsY, 0, 0, settings.c.width, settings.c.height);

}


module.exports = manipulate;
