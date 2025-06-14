const mongoose = require("mongoose");

// Author Schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: {
        type: [String],
        required: true
    }
})



// Export the model
module.exports = mongoose.model("Author", authorSchema);