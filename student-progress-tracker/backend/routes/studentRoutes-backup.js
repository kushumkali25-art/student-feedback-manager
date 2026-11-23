const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.post("/add-student", async (req, res) => {
  try {
    const { name, email, course, totalMarks, obtainedMarks, attendance } = req.body;

    const newStudent = new Student({
      name,
      email,
      course,
      totalMarks,
      obtainedMarks,
      attendance
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully!",
      student: newStudent
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding student",
      error: error.message
    });
  }
});

// GET: Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
});

module.exports = router;