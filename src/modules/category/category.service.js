const Category = require("./category.model");

class CategoryService {
  // Create a new category
  async createCategory(data) {
    const existed = await Category.findOne({ title: data.title, titleKH: data.titleKH });
    if (existed) {
      throw new Error("Category already exists");
    }
    const category = await Category.create(data);
    return category;
  }


  // Get category by ID
  async getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
  }
  // Get all categories except the ones with title 'More'
  async getAllCategories() {
    try {
      const categories = await Category.find({ title: { $ne: "More" } }, { __v: 0 });
      if (!categories) throw new Error("Not found categories");
      return categories;
    } catch (e) {
      throw new Error("Could not loading data...");
    }

  }

  // Get random categories + the 'more' category
  async getRandomCategories() {
    try {
      let categories = await Category.aggregate([
        { $match: { value: { $ne: "more" } } },
        { $sample: { size: 5 } },
      ]);

      const moreCategory = await Category.findOne({ value: "more" }, { __v: 0 });
      if (moreCategory) categories.push(moreCategory);

      if (!categories || categories.length === 0) {
        throw new Error("No categories found");
      }

      return categories;
    } catch (error) {
      throw new Error(error.message || "Database error while fetching random categories");
    }

  }

  async getByIds(id) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(error.message || "Database error while fetching category by ID");
    }
  }
}

// Export a singleton instance
module.exports = new CategoryService();
