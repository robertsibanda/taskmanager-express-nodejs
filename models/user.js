const mongoose = require("mongoose")

const User = mongoose.Schema({
    username : {
        type: String,
        unique: [true, "username must be unique"],
        required: [true, "username is required"]
    },

    password : {
        type: String,
        required: [true, "password is required"]
    },

    email: {
        type: String,
        unique : true
    },

    tasks: []
});


module.exports = mongoose.model("users", User)