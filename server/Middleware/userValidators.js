const {check} = require('express-validator')
const People = require('../Model/people');


// add user
const addUserValidators = [
    check('username')
    .isLength({min:1})
    .withMessage("Username Is required")
    .isAlpha("en-US", {ignore : " -"})
    .withMessage("Usename must not contain anything other than alphaet")
    .trim(),

    check('email').isEmail().withMessage("Invalid Email Address").trim()
    .custom(async(value) => {
        try {
            const people = new People.findOne({email : value});
            if(people){
                console.log("Email already in Use!")
            }
        } catch (err) {
           console.log(err);        
        }
    }),
    check('password')
    .isStrongPassword()
    .withMessage("Password must be 8 character long and contain upercase lowercase symbol and numer"),

];




// exports
module.exports = {
    addUserValidators,
}
