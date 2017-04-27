var electron = require("electron");

electron.app.on('ready', function() {
  var mainWindow = new electron.BrowserWindow({width: 900, height: 800});

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/index.html');
})
