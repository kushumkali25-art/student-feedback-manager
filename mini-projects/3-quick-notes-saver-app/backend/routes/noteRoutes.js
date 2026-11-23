const express = require("express");
const router = express.Router();

const Note = require("../models/Note");


router.post("/add-note", async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content
        });

        await newNote.save();

        res.status(201).json({
            message: "Note saved successfully!",
            note: newNote
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving note",
            error: error.message
        });
    }
});


router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching notes",
            error: error.message
        });
    }
});

module.exports = router;
