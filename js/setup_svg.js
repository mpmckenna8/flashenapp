// function to setup the svg
module.exports = function( width, screenWidth, screenHeight, height ) {

  let svg = d3.select('#flashsvg')
  svg.attr('width', width * screenWidth)
  svg.attr('height', screenHeight * height)
  svg.style('background-color', 'pink')

  pixels = []

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      //  console.log(x)
      pixels.push(new Pixel(x, y))
    }
  }
}
