// keep sending stuff to flashentaschen

function keepsending ( flash ) {
  console.log('is it still checked', flash)

  flash.show();
  setTimeout(function (elap) {
    if (!(document.getElementById('contcheck').checked)) {
      // t.stop();
      console.log('stoping the refresh')
    } else {

      if(flash) {
        keepsending(flash)
      }
    }
  }, settings.refreshDelay)
}

module.exports = keepsending;
