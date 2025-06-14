const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");


router.get("/", verifyToken, userController.getUsers);
router.post("/", verifyToken, userController.createUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.get("/me", verifyToken, userController.me);

module.exports = router;