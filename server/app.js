//external imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');

const authRoutes = require("./Router/authRoutes");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// MongoDB connect
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log("Connection Successfull")
})
.catch((err) => console.log(err))

app.listen(process.env.PORT,() => {
    console.log(`Listening to port ${process.env.PORT}`)
});