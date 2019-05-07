// playpause function

function playpause(settings, renderFrame){
  settings.playing = !settings.playing;
  if(settings.playing){
    renderFrame();
  }
}

module.exports = playpause;
