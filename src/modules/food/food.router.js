const express = require("express");
const foodRouter = express.Router();
const foodController = require("./food.controller");
const { verifyVendor, verifyTokenAndAuthorization } = require("../../middleware/verifyToken");

//* 
foodRouter.post("/", verifyVendor, foodController.createFood);
foodRouter.get("/", foodController.findAllFoods);
foodRouter.get("/detail/:id", foodController.getFoodById);
foodRouter.delete("/delete/:id", foodController.deleteById);
foodRouter.get("/find-by-restaurant/:id", foodController.getFoodsByRestaurant);
foodRouter.get("/random-food/:code", foodController.getRandomFood);
foodRouter.get("/food-all", foodController.findAllFoods);
foodRouter.get("/food-categories/:id", foodController.categoriesFetchByFood);
foodRouter.get("/category-name-by-food/:name", foodController.getCategoryNameByFood);
foodRouter.get("/categories-by-restaurant/:restaurantId", foodController.categoryBYFood);
//* Search ,and category ,code,
foodRouter.get("/byCode/:code", foodController.getFoodByCode);
foodRouter.get("/search/:search", foodController.searchFoods);
foodRouter.get("/category/:category/:code", foodController.getFoodByCategoryAndCode);
foodRouter.get("/random-code-food/:category/:code", foodController.getRandomFoodByCategoryAndCode);
foodRouter.get("/recommendation/:code", foodController.getRandomFood);
foodRouter.get("/category-food/list", foodController.findAllCategoryByFood);
foodRouter.get("/restaurant-food/:id", foodController.getRestaurantIdByFood);
module.exports = foodRouter;    