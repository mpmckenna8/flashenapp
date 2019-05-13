

  function renderFrame(settings) {
  	// get the frame
  	var frame = settings.loadedFrames[settings.frameIndex];
  	var start = new Date().getTime();

  	settings.gifCtx.clearRect(0, 0, settings.c.width, settings.c.height);
  	// draw the patch

  	drawPatch(frame, settings);

  	// perform manipulation
  	manipulate(settings);

  	// update the frame index
    if( settings.loadedFrames.length ){

    	settings.frameIndex++;
    	if(settings.frameIndex >= settings.loadedFrames.length){
    		settings.frameIndex = 0;
    	}

    	var end = new Date().getTime();
    	var diff = end - start;

    	if(settings.playing){
    		// delay the next gif frame
        flashenSvg(settings.c.width, settings.c.height, settings.ct, settings, sendToFlaschen, drawFlash);

    		setTimeout(function(){
    			renderFrame(settings)//requestAnimationFrame(renderFrame);
    		}, Math.max(0, Math.floor(frame.delay - diff)));
    	}
    }
  }

module.exports = renderFrame
