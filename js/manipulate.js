// function to manipulate imageSmoothingEnabled

  var edge = require('./js/edge.js')
  var invert = require('./js/invert.js')
  var grayscale = require('./js/greyscale.js')
  var pixelPercent = 100;


function manipulate(gifCanvas, gifCtx) {

  var imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
  var other = gifCtx.createImageData(gifCanvas.width, gifCanvas.height);

  if(bEdgeDetect){
    imageData = edge(imageData.data, other);
  }

  if(bInvert){
    invert(imageData.data);
  }

  if(bGrayscale){
    grayscale(imageData.data);
  }

  // do pixelation
  var pixelsX = 5 + Math.floor(pixelPercent / 100 * (c.width - 5));
  var pixelsY = (pixelsX * c.height) / c.width;

  if(pixelPercent != 100){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }


  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, pixelsX, pixelsY);
  ctx.drawImage(c, 0, 0, pixelsX, pixelsY, 0, 0, c.width, c.height);

}


module.exports = manipulate;
