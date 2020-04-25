const {app, dialog, BrowserWindow} = require('electron')   
// const Notification = require('node-mac-notifier');
// const Notification2 = require('node-mac-notifier');  
// const storage = require('electron-storage'); 
function createWindow () {   
  // Create the browser window.     
    win = new BrowserWindow({width: 1200, height: 800}) 
        
    // and load the index.html of the app.     
    // win.loadFile('index.html') 
    win.loadURL('http://localhost:3000/')  
} 
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.on('ready', createWindow)

