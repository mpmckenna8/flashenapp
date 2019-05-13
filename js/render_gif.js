function renderGIF( frames, settings, c, gifCanvas, playpause, renderFrame ){
  settings.loadedFrames = frames;
//  console.log('frames = ', frames)
  settings.frameIndex = 0;
//    console.log('framcs width supposedly,', frames[0].dims.width)

    c.width = frames[0].dims.width;
    c.height = frames[0].dims.height;

    gifCanvas.width = c.width;
    gifCanvas.height = c.height;

    if(!settings.playing){
      playpause(settings, renderFrame);
    }
}

module.exports = renderGIF;
