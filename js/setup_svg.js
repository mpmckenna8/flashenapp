// function to setup the svg
var Pixel = require('../pixer.js')


module.exports = function( settings ) {

  let svg = d3.select('#flashsvg')
  svg.attr('width', settings.svg_pixel_width * settings.screenWidth)
  svg.attr('height', settings.screenHeight * settings.svg_pixel_height)
  svg.style('background-color', 'pink')

  for (let y = 0; y < settings.screenHeight; y++) {
    for (let x = 0; x < settings.screenWidth; x++) {
      //  console.log(x)
      settings.pixels.push(new Pixel(x, y))
    }
  }
}
