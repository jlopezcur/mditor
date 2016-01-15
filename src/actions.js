// Global objects

var currentFileName = null;

// Load actions

function loadFileDialog() {
    dialog.showOpenDialog({ filters: [
        { name: 'MarkDown', extensions: ['md'] },
        { name: 'All Files', extensions: ['*'] }
    ]}, function (fileNames) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        loadFile(fileName);
    });
}

function loadFile(fileName) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err) dialog.showErrorBox("File Open Error", err.message);
        vm.loadContent(data);
        currentFileName = fileName;
        remote.getCurrentWindow().setTitle(currentFileName);
    });
}

// Save actions

function saveDocument() {
    if (file == null) saveFileDialog();
    else saveFile(file);
}

function saveFileDialog() {
    dialog.showSaveDialog(function (fileName) {
        saveFile(fileName);
    });
}

function saveFile(fileName) {
    fs.writeFile(fileName, vm.saveContent(), function (err) {
        if (err) dialog.showErrorBox("File Save Error", err.message);
        currentFileName = fileName;
        remote.getCurrentWindow().setTitle(currentFileName);
    });
}
