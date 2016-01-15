var remote = require('remote');
const BrowserWindow = remote.BrowserWindow;
var Menu = remote.require('menu');
var dialog = remote.require('dialog');
var fs = require('fs');

var template = [{
    label: 'File',
    submenu: [
        { label: 'New Window', accelerator: 'Ctrl+N', click: function () { window.open('index.html'); } },
        { label: 'Load file...', accelerator: 'Ctrl+O', click: loadFileDialog },
        { type: 'separator' },
        { label: 'Save as...', accelerator: 'Ctrl+Shift+S', click: saveFileDialog },
        { label: 'Save', accelerator: 'Ctrl+S', click: saveDocument },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Ctrl+Q', role: 'close' }
    ]
},{
    label: 'Edit',
    submenu: [
        { label: 'Undo', accelerator: 'Ctrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+Ctrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Ctrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'Ctrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'Ctrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'Ctrl+A', role: 'selectall:' }
    ]
},{
    label: 'View',
    submenu: [
        { label: 'Reload', accelerator: 'Ctrl+R', click: function() { remote.getCurrentWindow().reload(); } },
        { label: 'Toggle DevTools', accelerator: 'Alt+Ctrl+I', click: function() { remote.getCurrentWindow().toggleDevTools(); } }
    ]
},{
    label: 'Help',
    submenu: [
        { label: 'About...', click: showAboutDialog }
    ]
}];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
