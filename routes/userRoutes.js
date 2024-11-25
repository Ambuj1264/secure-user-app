const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:id", authenticateJWT, getUserProfile);

module.exports = router;
