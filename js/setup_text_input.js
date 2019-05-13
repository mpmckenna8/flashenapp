// function to set up all the text input stuff.


module.exports = function(settings) {


      d3.select('#text_input').on('change', function(value) {
        console.log('changed text to', this.value)
        settings.display_text.text = this.value
      })


      d3.select("#x_offset").on('change', function(e) {
        settings.display_text.x_offset = this.value;
      })

      d3.select("#y_offset").on('change', function(e) {
        settings.display_text.y_offset = this.value;
      })



      d3.select("#text_size").on('change', function(e) {
        console.log('changed size to ', this.value)
        settings.display_text.size = this.value;
      })


}
