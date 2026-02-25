const restaurantModel = require("./restaurant.model");

class RestaurantService {
  async addRestaurant(data) {
    if (
      !data.title ||
      !data.time ||
      !data.imageUrl ||
      !data.owner ||
      !data.logoUrl ||
      !data.coords ||
      !data.coords.latitude ||
      !data.coords.longitude ||
      !data.coords.latitudeDelta ||
      !data.coords.longitudeDelta
    ) {
      throw new Error("Missing required fields");
    }
    try {
      const restaurant = await restaurantModel.create(data);
      return restaurant;
    } catch (error) {
      console.error("Error creating restaurant:", error);
      throw new Error("Database error while creating restaurant");
    }
  }

  async getAllRestaurants() {

    try {
      const restaurants = await restaurantModel.find();
      if (!restaurants) {
        throw new Error("Database error while fetching restaurants");
      }
      return restaurants;
    } catch (e) {
      throw new Error("Database error while fetching restaurants");
    }
  }

  async getRestaurantById(id) {
    try {
      if (!id) {
        throw new Error("restaurant doest exist");
      }
      const restaurant = await restaurantModel.findById(id);
      return restaurant;
    } catch (e) {
      throw new Error("Database error while fetching restaurants");

    }
  }

  async getRandomRestaurants(code) {
    try {
      let randomRestaurants = [];
      //* pickup 5 restaurant by code
      if (code) {
        randomRestaurants = await restaurantModel.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      //* If no restaurants found with that code, get random available ones
      if (randomRestaurants.length === 0) {
        randomRestaurants = await restaurantModel.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }
      return randomRestaurants;
    } catch (e) {
      console.error("Error fetching random restaurants:", e);
      throw new Error("Database error while fetching restaurants");
    }
  }
  async allNearbyRestaurants(code) {
    try {
      let nearbyRestaurants = [];
      if (code) {
        nearbyRestaurants = await restaurantModel.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      //* If no restaurants found with that code, get random available ones
      if (nearbyRestaurants.length === 0) {
        nearbyRestaurants = await restaurantModel.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }
      return nearbyRestaurants;
    } catch (e) {
      console.error("Error fetching random restaurants:", e);
      throw new Error("Database error while fetching restaurants");
    }
  }
}

module.exports = new RestaurantService();
