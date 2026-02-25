const express = require("express");
const router = express.Router();

const categoryRoutes = require("./category/category.route");
const restaurantRoutes = require("./restaurant/restaurant.route");
const foodRoutes = require("./food/food.router");
const ratingRoutes = require("./rating/rating.router");
const authRoutes = require("./auth/auth.router");
const userRoutes = require("./user/user.route");
const addressRouter = require("./address/address.router");
const cartRouter = require("./cart/cart.router");
const orderRouter = require("./order/order.router");


router.use("/categories", categoryRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/foods", foodRoutes);
router.use("/ratings", ratingRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/address", addressRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);



module.exports = router;
