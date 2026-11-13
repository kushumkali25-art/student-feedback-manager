const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Feedback = require("./models/Feedback");

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("FeedbackHub API is running!");
});

// POST: Save feedback
app.post("/api/feedback", async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        const feedback = new Feedback({
            name,
            rating,
            comment
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully!",
            feedback
        });

    } catch (error) {
        res.status(500).json({
            message: "Submission failed",
            error: error.message
        });
    }
});

// GET: Display all feedback
app.get("/api/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Feedback fetched successfully!",
            feedbacks
        });

    } catch (error) {
        res.status(500).json({
            message: "Fetching failed",
            error: error.message
        });
    }
});

// DELETE: Remove feedback
app.delete("/api/feedback/:id", async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(
            req.params.id
        );

        if (!deletedFeedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.json({
            message: "Feedback deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Delete failed",
            error: error.message
        });
    }
});

// Connect database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(process.env.PORT || 9000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });