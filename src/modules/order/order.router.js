const router = require("express").Router();

const orderController = require("./order.controller");
const { verifyTokenAndAuthorization } = require("../../middleware/verifyToken");

router.post("", verifyTokenAndAuthorization, orderController.placeOrder);
router.get("/", verifyTokenAndAuthorization, orderController.gerUserOrders);

module.exports = router;