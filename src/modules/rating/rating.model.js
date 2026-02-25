const { mongoose } = require("mongoose");

const RatingSchema = mongoose.Schema({
    userI: {
        type: String,
        required: true,
    },
    ratingType: {
        type: String,
        required: true,
        enum: ["Food", "Restaurant", "Delivery"],

    },
    product: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
})

module.exports = mongoose.model("Rating", RatingSchema);