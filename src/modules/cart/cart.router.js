const router = require('express').Router();

const cartController = require("./cart.controller");
const { verifyTokenAndAuthorization } = require('../../middleware/verifyToken');

// Add item to cart
router.post("/", verifyTokenAndAuthorization, cartController.addCartToProduct);

// Get user's cart
router.get("/my-cart", verifyTokenAndAuthorization, cartController.getCart);

// Get cart item count
router.get("/count", verifyTokenAndAuthorization, cartController.countCart);

// Remove item from cart
router.delete("/remove/:id", verifyTokenAndAuthorization, cartController.removeCart);

// Decrement item quantity
router.put("/decrement/:id", verifyTokenAndAuthorization, cartController.decrementCart);

module.exports = router;