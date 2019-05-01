// function to draw flashentaschen svg given the imput data


// needs data in an array,
// settings object
function drawFlash (data, settings) {

  console.log('drawFlash running,', data)
  settings.svg.selectAll('rect').remove()

  var pixs = settings.svg.selectAll('rect')
      .data(data)

  pixs.enter().append('rect')
      .attr('x', function (d) {
    //  console.log(d)
        return settings.svg_pixel_width * d.xin
      })
      .attr('width', settings.svg_pixel_width)
      .attr('height', settings.svg_pixel_height)
      .attr('y', function (d) {
        return settings.svg_pixel_height * d.yin
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
}

module.exports = drawFlash;
