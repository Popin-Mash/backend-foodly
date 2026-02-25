const { create } = require("../category/category.model");
const restaurantService = require("./restaurant.service");

class RestaurantController {
  async createRestaurant(req, res) {
    try {
      const restaurant = await restaurantService.addRestaurant(req.body);
      res.status(201).json(restaurant);
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }

  async randomRestaurants(req, res) {
    const code = req.params.code;
    try {
      const restaurants = await restaurantService.getRandomRestaurants(code);
      res.status(200).json(restaurants);
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }

  async nearbyRestaurants(req, res) {
    const code = req.params.code;
    try {
      const restaurants = await restaurantService.allNearbyRestaurants(code);
      res.status(200).json(restaurants);
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }

  async getRestaurantById(req, res) {
    const id = req.params.id;
    try {
      const restaurant = await restaurantService.getRestaurantById(id);
      res.status(200).json(restaurant);
    } catch (e) {
      res.status(500).json({ status: false, message: e.message });
    }
  }
}

module.exports = new RestaurantController();
