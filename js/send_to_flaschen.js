// function to send stuff to the Flashentashen

function sendToFlaschen(data, flash) {
//  console.log("data to send to flash: " + data);
  var datum = data // .split('\n');
  for (let d of datum) {
    try {
      var color = d.color
      flash.set(d.xin, d.yin, color)
    } catch (e) {
      console.log('there is an error', e)
    }
  }

  flash.show()
}

module.exports = sendToFlaschen;
