const Author = require("../models/authorsModel");

exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        // Basic validation
        if (!req.body.name || !req.body.books) {
            return res.status(400).json({ error: "Name and books are required" });
        }
        
        const author = new Author(req.body);
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        await Author.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Author updated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.json({ message: "Author deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
