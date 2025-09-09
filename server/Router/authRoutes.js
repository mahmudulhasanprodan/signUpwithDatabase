const express = require("express");
const People = require('../Model/people');
const bcrypt = require('bcrypt');

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

module.exports = router;