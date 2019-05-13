function drawPatch(frame, settings){
  if( frame ){
    var dims = frame.dims;

    if(!settings.frameImageData || dims.width != settings.frameImageData.width || dims.height != settings.frameImageData.height){
      settings.tempCanvas.width = dims.width;
      settings.tempCanvas.height = dims.height;
      settings.frameImageData = settings.tempCtx.createImageData(dims.width, dims.height);
    }
    // set the patch data as an override
    settings.frameImageData.data.set(frame.patch);

    // draw the patch back over the canvas
    settings.tempCtx.putImageData(settings.frameImageData, 0, 0);

    settings.gifCtx.drawImage(settings.tempCanvas, dims.left, dims.top);

  }
}

module.exports = drawPatch;
