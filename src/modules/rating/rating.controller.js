const ratingService = require("./rating.service");


module.exports = {
    addRating: async (req, res) => {
        try {
            await ratingService.addRating(req.body);
            res.status(201).json({ status: true, message: "rating has been successfully added" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    checkRating: async (req, res) => {
        try {
            const ratingType = req.query.ratingType;
            const product = req.query.product;
            await ratingService.existingRating(ratingType, product, req.user.id);
            res.status(200).json({ status: true, message: "success" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


    }
}