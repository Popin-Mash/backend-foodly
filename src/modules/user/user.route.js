const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../../middleware/verifyToken");


const UserController = require("./user.controller");

router.get("/", verifyTokenAndAuthorization, UserController.getUser);
router.post("/verified/:otp", verifyTokenAndAuthorization, UserController.verifiedAccount);
router.get("/verified-phone/:code", verifyTokenAndAuthorization, UserController.verificationPhone);

module.exports = router;