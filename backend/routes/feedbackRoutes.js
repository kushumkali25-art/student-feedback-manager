const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

// POST: Submit feedback
router.post("/", async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        if (!name || !rating || !comment) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newFeedback = new Feedback({
            name,
            rating,
            comment
        });

        await newFeedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully!",
            feedback: newFeedback
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting feedback",
            error: error.message
        });
    }
});

// GET: Get all feedback
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Feedback fetched successfully!",
            feedbacks
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching feedback",
            error: error.message
        });
    }
});

// DELETE: Delete feedback
router.delete("/:id", async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(
            req.params.id
        );

        if (!deletedFeedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            message: "Feedback deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting feedback",
            error: error.message
        });
    }
});

module.exports = router;