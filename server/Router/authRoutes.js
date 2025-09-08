const express = require("express");
const People = require('../Model/people');

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password,confirmpassword } = req.body;

    // Check if email already exists
    const existingUser = await People.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new People({ username, email, password,confirmpassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;