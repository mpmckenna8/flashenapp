
module.exports = {
  refreshDelay: 500,

  screenWidth: 45,
  screenHeight: 35,

  svg_pixel_width: 15,
  svg_pixel_height: 15,
  pixels: [],
  svg:  d3.select('#flashsvg'),

  display_text: {
                        text: '',
                        x_offset: 0,
                        y_offset:100,
                        size:11
                      },

  playing: false,
  frameIndex: 0,
  url: document.getElementById('linkin'),
  bEdgeDetect: false,
  bInvert: false,
  bGrayscale: false,
  pixelPercent: 100,
  loadedFrames: null,
  src: 'https://i.ytimg.com/vi/1pH5c1JkhLU/hqdefault.jpg',
  frameImageData: null,

  gif: null,

  c: null,
  ctx: null,

  gifCanvas: null,
  gifCtx: null,

  display_canvas: document.getElementById('mycanvas'),

  tempCanvas: null,
  tempCtx: null,
  ct: null,
  drawing: false,

  draw_color: {r:0, g:0, b:0}

}
