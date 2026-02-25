
const Cart = require("./cart.schema");
const Food = require("../food/food.model");

class CartController {
    async addCartToProduct(req, res) {
        const userId = req.user.id;
        const { productId, totalPrice, quantity, additives } = req.body;
        let count;
        try {
            // * find user added cart by productId and user id
            const existingProduct = await Cart.findOne({ userId, productId });
            //* total of cart that user added
            count = await Cart.countDocuments({ userId: userId });
            //* if user want add more, we going to calculator total price and save() 
            const qty = Math.max(1, Number(quantity));
            if (existingProduct) {
                existingProduct.totalPrice += totalPrice * quantity;
                existingProduct.quantity += qty;
                await existingProduct.save();
                res.status(200).json({ status: true, message: "Item updated successfully", count: count });
            }
            else {
                //*if empty card user can add new cart
                const newCart = new Cart({
                    userId,
                    productId,
                    totalPrice,
                    quantity: qty,
                    additives,
                });
                await newCart.save();
                count = await Cart.countDocuments({ userId: userId });
                res.status(201).json({ status: true, message: "Item added to cart successfully", count: count })
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    async removeCart(req, res) {
        const cartITtemId = req.params.id;
        const userId = req.user.id;
        try {
            //* __v id mongoose 
            //* remove cart by id of cart collection by __v and user id that has added this cart
            await Cart.deleteOne({ _id: cartITtemId, userId: userId });
            res.status(200).json({ status: true, message: "Item removed successfully" });
        } catch {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    async getCart(req, res) {
        try {
            const userId = req.user.id;
            //* find cart by user id
            const cart = await Cart.find({ userId: userId }).populate({
                path: "productId",
                select: "imageUrl title restaurant rating ratingCount price",
                populate: {
                    path: "restaurant",
                    select: "time coords"
                }
            });
            const pid = cart[0]?.productId;

            const food = await Food.findById(pid).lean();
            const clean = cart.filter(c => c.productId != null);
            console.log("FOOD FOUND?", !!food, food?._id);
            if (!cart || cart.length === 0) {
                return res.status(200).json({
                    status: true,
                    message: "Cart is empty",
                    data: []
                });
            }

            return res.status(200).json(
                clean
            );
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Failed to fetch cart",
                error: e.message
            });
        }
    }
    async countCart(req, res) {
        const userId = req.user.id;
        try {
            const count = await Cart.countDocuments({ userId: userId });
            if (count.length === 0) {
                res.status(200).json({ status: true, count: 0 });
            }
            res.status(200).json({ status: true, count: count });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    async decrementCart(req, res) {
        const cartItemId = req.params.id;
        const userId = req.user.id;
        try {
            const cartItem = await Cart.findById(cartItemId);
            if (cartItem) {
                const productPrice = cartItem.totalPrice / cartItem.quantity;
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= productPrice;
                    await cartItem.save();
                    res.status(200).json({ status: true, message: "Item decremented successfully" });
                } else {
                    await Cart.findByIdAndDelete({ _id: cartItemId });
                    res.status(200).json({ status: true, message: "Item removed successfully" });
                }
            } else {
                res.status(404).json({ status: false, message: "Cart not found" });
            }
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }

    }

}
module.exports = new CartController();