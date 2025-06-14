const mongoose = require("mongoose");

// Book Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    }
})  

// Export the model 
module.exports = mongoose.model("Book", bookSchema);    