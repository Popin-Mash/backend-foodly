const Order = require("./order.model")


class OrderController {
    async placeOrder(req, res) {
        const newOrder = await Order({
            ...req.body,
            userId: req.user.id,
        })
        try {
            await newOrder.save();
            const orderId = newOrder._id;
            res.status(201).json({ status: true, message: "Order successfully placed", orderId: orderId });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    }
    async gerUserOrders(req, res) {
        const userId = req.user.id;
        const { paymentStatus, orderStatus } = req.query;
        let query = { userId };
        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        if (orderStatus) {
            query.orderStatus = orderStatus;
        }

        try {
            const orders = await Order.find(query)
                .populate({
                    path: 'orderItems.foodId',
                    select: 'imageUrl title rating time'
                });
            if (orders.length === 0) {
                return res.status(404).json({ status: false, message: "No orders found" });
            }
            res.status(200).json(orders);

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    }


}

module.exports = new OrderController();