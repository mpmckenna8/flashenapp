// keep sending stuff to flashentaschen

function keepsending ( flash ) {
  flash.show();
  //  console.log('is it still checked', d3.select('#contcheck')[0][0].checked)
  setTimeout(function (elap) {
    if (!(document.getElementById('contcheck').checked)) {
      // t.stop();
      console.log('stoping the refresh')
    } else {
      keepsending()
    }
  }, settings.refreshDelay)
}

module.exports = keepsending;
