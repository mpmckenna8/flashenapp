module.xports = function(data) {
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i +1] + data[i +2]) / 3;
    data[i]     = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
    data[i + 3] = 255;
  }
};
