// function to setup the svg
var Pixel = require('../pixer.js')
var d3 = require('d3')

module.exports = function( settings, drawFlash ) {

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

  let data = settings.pixels;

  var pixs = settings.svg.selectAll('rect')
      .data(data)


  pixs.join( enter => {
      enter.append('rect')
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
          .attr('class', "flashpix")


        },
        update => {
            console.log('need to update the svg');
            update
              .attr('fill', (d) => {
                let onPixel = settings.pixels[ d.yin * settings.screenWidth + d.xin ]
                return d3.rgb( onPixel.color[0],onPixel.color[1], onPixel.color[2]  )
              })
        }
      )



      d3.selectAll('.flashpix')
      .on('mousedown', (d) => {

        console.log('start drawing', d)
        settings.drawing = true;

        console.log('should be drawing color ', settings.draw_color)
        let draw_color = settings.draw_color
      //  settings.pixels[ ( d.xin, d.yin) ].color = [draw_color.r , draw_color.g , draw_color.b ]// need to make a settings drawcolor to set it as


      })
      .on('mouseup', (d) => {

        console.log('stop drawing', d)
        settings.drawing = false;
        drawFlash(settings)


      })
      .on('mouseover', function(d) {

        console.log('mousing over,, ',this)
        if(settings.drawing) {

          d3.select(this).attr('fill', function(d) {

            let draw_color = settings.draw_color
            settings.pixels[ ( d.xin + settings.screenWidth * d.yin) ].color = [draw_color.r , draw_color.g , draw_color.b ]

            sendToFlaschen(settings.pixels, flash)

            return 'rgb(' + draw_color.r + ',' + draw_color.g + ',' + draw_color.b + ')'


            console.log('want to change the color of ', d)
        })
        }
      })




}
