// Load saved notes from localStorage
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = "";

    notes.forEach((text, index) => {
        createNoteElement(text, index);
    });
}

// Create note box UI
function createNoteElement(text = "", index = null) {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <textarea>${text}</textarea>
        <button class="deleteBtn">Delete</button>
    `;

    // Delete note
    note.querySelector(".deleteBtn").addEventListener("click", () => {
        deleteNote(index);
    });

    // Update note text
    note.querySelector("textarea").addEventListener("input", (e) => {
        updateNote(index, e.target.value);
    });

    notesContainer.appendChild(note);
}

// Add new note
addNoteBtn.addEventListener("click", () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push("");
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
});

// Update existing note
function updateNote(index, newText) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes[index] = newText;
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Delete note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Initial loading
loadNotes();
