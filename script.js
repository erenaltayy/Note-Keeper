const submitBtn = document.getElementById("submitBtn");

const createNoteElement = (note) => {
    const notesArea = document.getElementsByClassName("notes")[0];
    const noteContainer = document.createElement("div");
    noteContainer.className = "note";
    const noteHeader = document.createElement("h3");
    noteHeader.innerText = note.noteHeader;
    const noteContent = document.createElement("p");
    noteContent.innerText = note.noteContent;
    const btn = document.createElement("button");
    btn.innerText = "Notu Sil";
    btn.className = "deleteNoteBtn";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        electronAPI.send("deleteNoteFromDB", note.noteHeader);
        noteContainer.remove();
    });
    noteContainer.appendChild(noteHeader);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(btn);
    notesArea.appendChild(noteContainer);
};

const showNotification = (title, message) => {
    new Notification(title, {body: message});
};

window.addEventListener("DOMContentLoaded", () => {
    electronAPI.send("getNotesFromDB");
});

electronAPI.on('notesData', (response) => {
    if (response.success) {
        const notes = response.notes;
        notes.forEach(element => {
            const note = {
                noteHeader: element.title,
                noteContent: element.body
            }
            createNoteElement(note);
        });
    } 
    else {
        console.error("Notları alırken bir hata oluştu:", response.error);
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    const inputNoteHeader = document.getElementById("noteHeader").value;
    const inputNoteContent = document.getElementById("noteContent").value;
    if (inputNoteHeader && inputNoteContent) {
        const note = { noteHeader: inputNoteHeader, noteContent: inputNoteContent };
        electronAPI.send("addNotetoDB", note);
        createNoteElement(note);
        document.getElementById("noteHeader").value = "";
        document.getElementById("noteContent").value = "";
    }
});

electronAPI.on("noteAdded", (response) => {
    if (response.success) {
        showNotification("Not eklendi", "Not başarıyla eklendi");
    } else {
        showNotification("Not ekleme hatası:", response.error);
    }
});

electronAPI.on("noteDeleted", (response) => {
    if (response.success) {
        showNotification("Not Silindi", "Not başarıyla silindi");
    } else {
        showNotification("Not silme hatası:", response.error);
    }
});




