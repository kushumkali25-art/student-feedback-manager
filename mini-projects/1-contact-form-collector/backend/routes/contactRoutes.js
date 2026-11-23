const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");


router.post("/submit-contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact submitted successfully!",
      contact: newContact
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving contact",
      error: error.message
    });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message
    });
  }
});

module.exports = router;
