var electron = require("electron");

electron.app.on('ready', function() {
  var mainWindow = new electron.BrowserWindow({width: 900, height: 800, webPreferences: {
        nodeIntegration: true
      }});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
})
