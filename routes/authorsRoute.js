const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authorsController");
const { verifyToken } = require("../middleware/authMiddleware");

// CRUD Routes for authors      
router.get("/", verifyToken, authorsController.getAuthors);
router.post("/", verifyToken, authorsController.createAuthor);
router.put("/:id", verifyToken, authorsController.updateAuthor);
router.delete("/:id", verifyToken, authorsController.deleteAuthor);

// Export the router
module.exports = router;
