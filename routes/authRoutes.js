const express = require("express");
const { registerUser, authUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authUser);

module.exports = router;
