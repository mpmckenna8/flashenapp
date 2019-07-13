function renderGIF( frames, settings, c, gifCanvas, playpause, renderFrame ){
  settings.loadedFrames = frames;
//  console.log('frames = ', frames)
  settings.frameIndex = 0;
//    console.log('framcs width supposedly,', frames[0].dims.width)

    settings.c.width = frames[0].dims.width;
    settings.c.height = frames[0].dims.height;

    gifCanvas.width = settings.c.width;
    gifCanvas.height = settings.c.height;

    if(!settings.playing){
      playpause(settings, renderFrame);
    }
}

module.exports = renderGIF;
