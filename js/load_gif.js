// a thing that runs when a gif is given as an input

// load a gif with the current input url value
function loadGIF( gif, settings, renderGIF, c, gifCanvas, playpause, rnderFrame ){
  var oReq = new XMLHttpRequest();
  oReq.open("GET", settings.url.value, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {

      var arrayBuffer = oReq.response;
      if (arrayBuffer) {
          gif = new GIF(arrayBuffer);
          var frames = gif.decompressFrames(true);
          // render the gif
          renderGIF(frames, settings, c, gifCanvas, playpause, renderFrame);
      }
  };
  oReq.send(null);
}

module.exports = loadGIF
