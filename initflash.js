// a function to initialize the flashentashen


module.exports = function(flash) {

  flash.layer = 13;
  flash.initBuffer();
  var datb = Buffer.alloc(flash.headerString().length + flash.footerString().length + flash.height * flash.width * 3)

  datb.write(flash.headerString(), 0)
  var starfoo = datb.length - flash.footerString().length
  datb.write(flash.footerString(), starfoo)

  flash.data = datb

}
