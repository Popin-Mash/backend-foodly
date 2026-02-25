const express = require("express");
const router = express.Router();
const restaurantController = require("./restaurant.controller");
const { verifyTokenAndAuthorization } = require("../../middleware/verifyToken");


router.post("/", verifyTokenAndAuthorization, restaurantController.createRestaurant);
router.get("/:code/random", restaurantController.randomRestaurants);
router.get("/:code/all-nearby", restaurantController.nearbyRestaurants);
router.get("/:id/details", restaurantController.getRestaurantById);

module.exports = router;
