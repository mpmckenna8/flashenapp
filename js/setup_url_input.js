function setupInput (imgi) {

  var linkinput = d3.select('#linkin')
  linkinput.on('keydown', function (err, d, e) {
  //  var linkinput = d3.select('#linkin');
    if (err) {
      console.log('somehow there was an error on keydown it is, ', err)
    }
    console.log('and d on keydown is, ', d)
  })
  // console.log(linkinput.value)
  linkinput.attr('value', imgi.src)
}


module.exports = setupInput;
