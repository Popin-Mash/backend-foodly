const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");

router.post("/", categoryController.create);
// router.get("/", categoryController.getAll);
router.get("/", categoryController.getAllCategories);
router.get("/random", categoryController.getRandomCategories);
router.get("/categories/:id", categoryController.getOne);
// router.put("/update/:id", categoryController.update);
// router.delete("/delete/:id", categoryController.deleteById);

module.exports = router;
