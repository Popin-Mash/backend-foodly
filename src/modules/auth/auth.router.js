const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { verifyTokenAndAuthorization } = require("../../middleware/verifyToken");
const { apiLimiter, authLimiter } = require("../../middleware/rateLimit");

router.post("/register", authLimiter, authController.createUser);
router.post("/register/vendor", authLimiter, authController.createVendor);
router.post("/login", authLimiter, authController.loginUser);

module.exports = router;