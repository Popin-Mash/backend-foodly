
const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../../middleware/verifyToken");

const ratingController = require("./rating.controller");

router.post("/", verifyTokenAndAuthorization, ratingController.addRating);
router.get("/", verifyTokenAndAuthorization, ratingController.checkRating);

module.exports = router;