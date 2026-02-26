const categoryService = require("./category.service");
const Category = require("./category.model");
class CategoryController {
  // Create a new category
  async create(req, res) {
    try {
      const data = { ...req.body };
      const category = await categoryService.createCategory(data);
      console.log("CREATE CATEGORY:", category);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Get all categories
  async getAll(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      if (!categories || categories.length === 0) {
        return res.status(404).json({ error: "No categories found" });
      }
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a single category by ID
  async getOne(req, res) {
    try {
      const { id } = req.params;

      if (!id || id.length !== 24) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID format",
        });
      }

      const category = await categoryService.getByIds(id);
      console.log("GET CATEGORY BY ID:", category);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // Update a category by ID
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id || id.length !== 24) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID format",
        });
      }
      const data = { ...req.body };
      const category = await categoryService.updateCategory(id, data);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // Delete a category by ID


  // Get all categories (only titles)
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      console.log("ALL CATEGORIES:", categories);
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  // Get random categories
  async getRandomCategories(req, res) {
    try {
      const categories = await categoryService.getRandomCategories();
      if (categories.length === 0) {
        return res.status(404).json({ status: false, message: "No categories found" });
      }
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
}

// Export an instance of the class
module.exports = new CategoryController();
