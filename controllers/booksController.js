const Book = require("../models/booksModel");

// Get all books (SEARCH FILTER AND PAGINATION)
exports.getBooks = async (req, res) => {
  try {
    const { author, title, page = 1, limit = 10 } = req.query;
    const query = {};

    if (author) query.author = new RegExp(author, 'i'); // partial match
    if (title) query.title = new RegExp(title, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Create a new book
exports.createBook = async (req, res) => {
  try {
    // Basic validation
    if (!req.body.title || !req.body.author) {
      return res.status(400).json({ error: "Title and author are required" });
    }
    
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Book updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.uploadCover = async (req, res) => {
  try {
    res.json({ message: 'Cover uploaded' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
