module.exports = pixel;

function pixel (xin, yin, color){

  this.xin = xin;
  this.yin = yin;
  this.color = color || [2,2,2];
  this.id = 'p'+ xin +'-' + yin;

//  return this;
}
