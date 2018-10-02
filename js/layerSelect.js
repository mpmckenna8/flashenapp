
function set_up_layer_select(flash) {
  var layers = [];

  for (i = 1; i < 16; i++) {
    layers.push(i);
  }

  var datb = Buffer.alloc(flash.headerString().length + flash.footerString().length + flash.height * flash.width * 3)

  //console.log(layers)

  d3.select('#layerselect')
    .on('change', function(d){
     console.log('it changed, ', this.value)
     flash.layer = parseInt(this.value);
     datb.write(flash.headerString(), 0);

   }).selectAll('option')
   .data(layers)
   .enter()
   .append('option')
   .attr('value', function(d){
     console.log('d of val', d)
     return d
   })
   .attr('selected', function(d){
     if( d === flash.layer ) {
       return true;
     }
     return false
   })
   .text( (d)=> d )


}
