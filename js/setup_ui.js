// this should init the ui elements that aren't included in other places
var d3 = require('d3')


module.exports = function( sendToFlaschen, settings, flash, imgi, ct, keepsending  ) {

  // Handle click on the button to update the flashentaschen
  d3.select('#updateBut')
    .on('click', function (d) {
      sendToFlaschen( settings.pixels, flash )
  })



    // When the check box if checked handle refreshing the flashentaschen or not
    d3.select('#contcheck')
      .on('change', function (d, i) {

        console.log('should be sending the image now or not')

        console.log('checkedout', d, flash)

        flashenSvg(imgi.width, imgi.height, ct)

        if (this.checked) {

          keepsending(flash)

        }
      })



}
