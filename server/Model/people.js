const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        trim: true,
        lowercase : true,
    },
    password: {
        type: Number,
        required: true,

    },
    confirmpassword: {
        type: Number,
        required: true,
        
    },
    role : {
        type: String,
        enum: ["admin","user"],
        default: "user"
    }

});

const People = mongoose.model('People',peopleSchema);

module.exports = People;