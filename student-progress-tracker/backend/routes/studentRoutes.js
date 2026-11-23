const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");

router.post("/add-progress", async (req, res) => {
  try {
    const {
      studentName,
      courseName,
      completionPercentage
    } = req.body;

    const newProgress = new Progress({
      studentName,
      courseName,
      completionPercentage
    });

    await newProgress.save();

    res.status(201).json({
      message: "Progress added successfully!",
      progress: newProgress
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding progress",
      error: error.message
    });
  }
});

router.get("/progress", async (req, res) => {
  try {
    const progressRecords = await Progress.find({
      studentName: { $type: "string", $ne: "" },
      courseName: { $type: "string", $ne: "" },
      completionPercentage: { $type: "number" }
    });

    res.status(200).json(progressRecords);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching progress",
      error: error.message
    });
  }
});

module.exports = router;
