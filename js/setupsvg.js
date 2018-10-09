var Pixel = require('./pixer.js')


function setUpSvg(screenWidth, screenHeight) {

  var width = 15
  var height = 15

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

  var pixs = svg.selectAll('rect')
      .data(pixels)

      pixs.enter().append('rect')
          .attr('x', function (d) {
            console.log('d in setup', d)
            return width * d.xin
          })
          .attr('width', width)
            .attr('height', height)
          .attr('y', function (d) {
            return height * d.yin
          })
          .attr('id', function (d) {
            return 'p' + d.xin + '-' + d.yin
          })
          .attr('d', function (d) {
            return JSON.stringify(d)
          })
          .attr('stroke', 'blue')
          .attr('fill', function (d) {
          //  console.log(d.color)
            return d3.rgb(d.color[0], d.color[1], d.color[2])
          })


      let draw_color = [0,0,0]
      let colorInput = d3.select('#colorChooser')
            .on('change', (d) => {

              console.log('d is ', d)
              console.log('this is', this)
            })

  return pixels
}
