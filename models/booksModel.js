const mongoose = require("mongoose");

// Book Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
    publishedYear: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    cover: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
})

// Export the model 
module.exports = mongoose.model("Book", bookSchema);    