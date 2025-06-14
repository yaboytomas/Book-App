const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

// CRUD Routes for books
router.get("/", verifyToken, booksController.getBooks);
router.post("/", verifyToken, booksController.createBook);
router.put("/:id", verifyToken, booksController.updateBook);
router.delete("/:id", verifyToken, checkRoleMiddleware("admin"), booksController.deleteBook);
router.post("/upload", verifyToken, upload.single('cover'), booksController.uploadCover);

// Export the router
module.exports = router;    