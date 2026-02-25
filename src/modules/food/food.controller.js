const foodService = require("./food.service");

module.exports = {
    createFood: async (req, res) => {
        try {
            const food = await foodService.addFood(req.body);
            res
                .status(201)
                .json({ status: true, message: "food has been successfully added", food });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    findAllFoods: async (req, res) => {
        try {
            const foods = await foodService.findAllFood();
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    },
    getFoodById: async (req, res) => {
        try {
            const { id } = req.params;
            const food = await foodService.getFoodById(id);
            res.status(200).json(food);
        } catch (e) {
            res.status(500).json({ message: e.message });

        }
    },
    deleteById: async (req, res) => {
        try {
            const { id } = req.params;
            const food = await foodService.deleteFood(id);
            res.status(200).json(food);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await foodService.getFoodByRestaurant(id);
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getRandomFood: async (req, res) => {
        const code = req.params.code;
        try {
            const foods = await foodService.getRandomFood(code);
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getFoodByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await foodService.getFoodByCategoryAndCode(category, code);
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    searchFoods: async (req, res) => {
        const search = req.params.search;
        try {
            const foods = await foodService.searchFoods(search);
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getRandomFoodByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await foodService.getRandomFoodByCategoryAndCode(category, code);
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getFoodByCode: async (req, res) => {
        const code = req.params.code;
        try {
            const foods = await foodService.getallFoodByCode(code);
            if (!foods) {
                res.status(500).json({ message: e.message });
            }
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    findAllCategoryByFood: async (req, res) => {
        try {
            const categories = await foodService.findAllCategoriesByFood();
            res.status(200).json(categories);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getRestaurantIdByFood: async (req, res) => {
        const restaurant = req.params.id;
        try {
            const restaurantId = await foodService.getRestaurantIdByFood(restaurant);
            res.status(200).json(restaurantId);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};
