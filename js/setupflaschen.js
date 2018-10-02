

function setUpFlaschen(flash) {


  flash.layer = 13;
  flash.init()

  var datb = Buffer.alloc(flash.headerString().length + flash.footerString().length + flash.height * flash.width * 3)
  flash.data = datb
  datb.write(flash.headerString(), 0)
  var starfoo = datb.length - flash.footerString().length
  datb.write(flash.footerString(), starfoo)


}
