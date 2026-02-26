const foodModel = require("./food.model");

class FoodService {
    async addFood(data) {
        // Check required fields only
        if (
            !data.title ||
            !data.time ||
            !data.foodTags ||
            !data.category ||
            !data.foodType ||
            !data.code ||
            !data.restaurant ||
            !data.rating ||
            !data.description ||
            !data.price ||
            !data.imageUrl
        ) {
            throw new Error("Missing some required fields");
        }

        // Validate additives if provided
        if (data.additives) {
            if (Array.isArray(data.additives)) {
                // If array, validate each item
                for (const additive of data.additives) {
                    if (!additive.id || !additive.title || !additive.price) {
                        throw new Error("Each additive must have id, title, and price");
                    }
                }
            } else {
                // If single object, validate it
                if (!data.additives.id || !data.additives.title || !data.additives.price) {
                    throw new Error("Additive must have id, title, and price");
                }
            }
        }

        try {
            const food = await foodModel.create(data);
            return food;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getFoodById(id) {
        try {
            const food = await foodModel.findById(id);
            return food;
        } catch (error) {
            throw new Error({ status: false, message: e.message });
        }
    }
    //* Restaurant menu
    async getFoodByRestaurant(id) {
        try {
            const food = await foodModel.find({ restaurant: id });
            return food;
        } catch (error) {
            throw new Error({ status: false, message: e.message });
        }
    }
    async getCategoryNameByFood(name) {
        try {
            const food = await foodModel.find({ category: name });
            return food;
        } catch (error) {
            throw new Error({ status: false, message: error.message });
        }
    }
    async getRandomFood(code) {
        try {
            let foods;
            if (code) {
                foods = await foodModel.aggregate([
                    //* where code =  req.code and available true
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } }, //* 5 return  restaurant
                    { $project: { __v: 0 } }, //* controller field exclude or include from dm
                ])
            }
            //* if code not existed, return 5 available true 
            if (foods.length === 0) {
                foods = await foodModel.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ])
            }
            return foods;
        } catch (error) {
            throw new Error({ status: false, message: e.message });
        }
    }
    //* Content search , food by category and code
    async getFoodByCategoryAndCode(category, code) {
        try {
            const foods = foodModel.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $project: { __v: 0 } },
            ])
            if (foods.length == 0) {
                throw new Error({ status: false, message: "No foods found" });
            }
            return foods;
        } catch (e) {
            throw new Error({ status: false, message: e.message });
        }
    }
    async searchFoods(search) {
        try {
            const result = await foodModel.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);
            if (result.length === 0) {
                return [];
            }
            console
            return result;
        } catch (e) {
            throw new Error({ status: false, message: e.message });
        }
    }
    async getRandomFoodByCategoryAndCode(category, code) {
        try {
            let foods;
            foods = await foodModel.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $sample: { size: 15 } },
            ])
            if (foods.length === 0) {
                foods = await foodModel.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 15 } }
                ])
            } else if (foods.length === 0) {
                foods = await foodModel.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 15 } }
                ])
            }
            return foods;
        } catch (e) {
            throw new Error({ status: false, message: e.message });

        }
    }
    async getallFoodByCode(code) {

        try {
            const foodList = await foodModel.find({ code: code });
            if (foodList.length === 0) {
                return { status: false, message: e.message }
            }
            return foodList;
        } catch (e) {
            throw new Error({ status: false, message: e.message });

        }
    }
    async findAllCategoriesByFood() {
        try {
            const categories = await foodModel.distinct("category");
            return {
                status: true,
                data: categories || []  // Ensure empty array if null/undefined
            };
        } catch (error) {
            console.error('Error fetching food categories:', error);  // Optional logging
            return {
                status: false,
                message: error.message || 'Failed to fetch categories',
            };
        }
    }
    async getRestaurantIdByFood(id) {
        try {
            const food = await foodModel.find({ restaurant: id });
            if (!food) {
                throw new Error("Food not found");
            }
            console.log(food);
            return food;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findAllFood() {
        try {
            const findAll = await foodModel.find();
            if (!findAll) {
                throw new Error("Food not found");
            }
            return findAll;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async fetchAllCategoriesByFood(restaurant) {
        return await foodModel.distinct("category",{restaurant: restaurant});
    }

}
module.exports = new FoodService();
