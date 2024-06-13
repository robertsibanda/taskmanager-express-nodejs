const mongoose = require("mongoose");

const database  = (URL) => {
    return mongoose.connect(URL)
        .then(() => {
            console.log("connected")
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = database