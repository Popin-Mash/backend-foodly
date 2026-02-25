const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },
    additives: {
        type: Array,
        default: [],
    },

    totalPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    }

}, { timestamps: true })

module.exports = mongoose.model("Cart", CartSchema);