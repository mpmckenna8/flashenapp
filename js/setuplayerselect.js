// move layer select to here

module.exports = ( flash ) => {
  var layers = [];

  for (i = 1; i < 16; i++) {
    layers.push(i);
  }

  d3.select('#layerselect') .on('change', function(d){
     console.log('it changed to newfunciton , this.value = , ', this.value)
     flash.layer = parseInt(this.value);
     flash.data.write(flash.headerString(), 0)
   }).selectAll('option')
   .data(layers)
   .enter()
   .append('option')
   .attr('value', function(d){
    // console.log('d of val', d)
     return d
   })
   .attr('selected', function(d){
     if( d === flash.layer ) {
       return true;
     }
     return false
   })
   .text( (d) =>  d )

}
