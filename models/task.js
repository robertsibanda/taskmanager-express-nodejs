const mongoose = require("mongoose")

const Task = mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    title : {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: String,
        required: true
    },

    completed: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("tasks", Task);