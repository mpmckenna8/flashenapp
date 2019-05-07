// this should init the ui elements that aren't included in other places
var d3 = require('d3')


module.exports = function( sendToFlaschen, settings, flash ) {

  // Handle click on the button to update the flashentaschen
  d3.select('#updateBut')
    .on('click', function (d) {
      sendToFlaschen( settings.pixels, flash )
  })


}
