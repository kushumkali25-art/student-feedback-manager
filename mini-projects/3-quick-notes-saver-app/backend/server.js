const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", noteRoutes);


app.get("/", (req, res) => {
    res.send("Quick Notes Saver API is running!");
});

const PORT = process.env.PORT || 9004;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });
