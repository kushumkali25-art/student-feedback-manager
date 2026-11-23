const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Contact Form Collector API is running!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 9002, () => {
      console.log(`Server running on port ${process.env.PORT || 9002}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });