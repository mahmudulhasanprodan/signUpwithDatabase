const express = require("express");
const People = require('../Model/people');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {

   try {
     const { username, email, password } = req.body;

     const existingUser = await People.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ error: "Email already registered" });
     }

      const hassPassword = await bcrypt.hash(password, 10);
  
      const people = new People({
        username: username,
        email: email,
        password: hassPassword,
        confirmpassword:hassPassword,
      });

      await people.save();
      res.json({ message: "User registered successfully!" });
      

   } catch (error) {
      console.log(error);
   }

});

// login route
router.post("/login", async (req,res) => {
    try {
      const { email, password } = req.body;

      // find user
      const people = await People.findOne({ email });
      if (!people)
        return res.status(400).json({ error: "Invalid email or password" });
      // compare password
      const isMatch = await bcrypt.compare(password, people.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid email or password" });

      // create JWT
      const token = jwt.sign(
        {
          username: people.username,
          Id: people._id,
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ 
        "message": "Login successful", 
        "access token" : token 
      });
    } catch (err) {
       res.status(500).json({ error: "Server error" });
    }
})


module.exports = router;