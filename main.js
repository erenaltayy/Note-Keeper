const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./lib/connection.js');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        },
    });

    win.loadFile('index.html');
    
}

app.whenReady().then(createWindow);

ipcMain.on("getNotesFromDB", (event) => {
    db.query('SELECT * FROM notes', (err, res) => {
        if (err) {
            console.log(err.stack);
            event.reply('notesData', { success: false, error: err.message });
        } else {
            console.log(res.rows);
            event.reply('notesData', { success: true, notes: res.rows });
        }
    });
});

ipcMain.on("addNotetoDB", (event, note) => {
    // Veritabanına not ekleme işlemini gerçekleştir
    db.query('INSERT INTO notes (title, body) VALUES ($1, $2)', [note.noteHeader, note.noteContent], (err, res) => {
        if (err) {
            console.error(err.stack);
            event.reply('noteAdded', { success: false, error: err.message });
        } else {
            console.log('Not eklendi:', note);
            event.reply('noteAdded', { success: true });
        }
    });
});

ipcMain.on('deleteNoteFromDB', (event, noteHeader) => {
    // Veritabanından notu silme işlemini gerçekleştir
    db.query('DELETE FROM notes WHERE title = $1', [noteHeader], (err, res) => {
        if (err) {
            console.error(err.stack);
            event.reply('noteDeleted', { success: false, error: err.message });
        } else {
            console.log('Not silindi:', noteHeader);
            event.reply('noteDeleted', { success: true });
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


