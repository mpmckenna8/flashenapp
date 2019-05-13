module.exports = function(data, output){

  var odata = output.data;
  var width = gif.raw.lsd.width;
  var height = gif.raw.lsd.height;

  var conv = [-1, -1, -1,
        -1, 8, -1,
        -1, -1, -1];
  var halfside = Math.floor(3/2);

  for(var y=0; y<height; y++){
    for(var x=0; x<width; x++){

      var r=0, g=0, b=0;
      for(var cy=0; cy<3; cy++){
        for(var cx=0; cx<3; cx++){

          var scy = (y - halfside + cy);
          var scx = (x - halfside + cx);

          if(scy >= 0 && scy < height && scx >= 0 && scx < width){
            var src = (scy * width + scx) * 4;
            var f= cy * 3 + cx;
            r += data[src] * conv[f];
            g += data[src + 1] * conv[f];
            b += data[src + 2] * conv[f];
          }
        }
      }

      var i = (y * width + x) * 4;
      odata[i]     = r;
      odata[i + 1] = g;
      odata[i + 2] = b;
      odata[i + 3] = 255;
    }
  }

  return output;
}
