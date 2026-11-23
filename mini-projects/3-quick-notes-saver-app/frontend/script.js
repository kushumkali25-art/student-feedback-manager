const API_URL = "http://localhost:9004/api";

const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const noteData = {
        title: document.getElementById("title").value.trim(),
        content: document.getElementById("content").value.trim()
    };

    if (!noteData.title || !noteData.content) {
        alert("Please enter both title and content.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/add-note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save note");
        }

        alert("Note saved successfully!");
        noteForm.reset();

        await loadNotes();

    } catch (error) {
        console.error("Error saving note:", error);
        alert("Error: " + error.message);
    }
});


async function loadNotes() {
    try {
        const response = await fetch(`${API_URL}/notes`);
        const notes = await response.json();

        if (!response.ok) {
            throw new Error("Unable to fetch notes");
        }

        notesList.innerHTML = "";

        if (notes.length === 0) {
            notesList.textContent = "No notes saved yet.";
            return;
        }

        notes.forEach((note) => {
            const card = document.createElement("div");
            card.className = "note-card";

            const heading = document.createElement("h3");
            heading.textContent = note.title;

            const content = document.createElement("p");
            content.textContent = note.content;

            const date = document.createElement("small");
            date.textContent = "Created: " +
                new Date(note.createdAt).toLocaleDateString();

            card.appendChild(heading);
            card.appendChild(content);
            card.appendChild(date);

            notesList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading notes:", error);
        notesList.textContent = "Unable to load notes: " + error.message;
    }
}

loadNotes();
