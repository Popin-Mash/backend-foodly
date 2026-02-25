const foodModel = require("../food/food.model");
const restaurantModel = require("../restaurant/restaurant.model");
const Rating = require("./rating.model");

class RatingService {
    async addRating(data) {
        const newRating = new Rating({
            userId: data.id,
            ratingType: data.rating,
            product: data.product,
            rating: data.rating,
        });
        try {
            await newRating.save();
            //* if rating type restaurant we going to update restaurant schema
            if (data.ratingType === "Restaurant") {
                const restaurant = await Rating.aggregate([
                    { $match: { ratingType: data.ratingType, product: data.product } },
                    { $group: { _id: '$product', avgRating: { $avg: "$rating" } } },

                ]);
                if (restaurant.length > 0) {
                    const avgRating = restaurant[0].avgRating;
                    await restaurantModel.findByIdAndUpdate(data.product, { rating: avgRating }, { new: true });
                }
            } else if (data.ratingType === "Food") {
                const food = await Rating.aggregate([
                    { $match: { ratingType: data.ratingType, product: data.product } },
                    { $group: { _id: '$product', avgRating: { $avg: "$rating" } } },
                ]);
                if (food.length > 0) {
                    const avgRating = food[0].avgRating;
                    await foodModel.findByIdAndUpdate(data.product, { rating: avgRating }, { new: true });
                }
            }
            return newRating;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async existingRating(data) {
        try {
            const existingRating = await Rating.findOne({ userId: data.user.id, product: data.product, ratingType: data.ratingType });
            if (existingRating) {
                throw new Error("you have already rated this item");
            } else {
                throw new Error("you don't have any rating yet");
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = new RatingService();