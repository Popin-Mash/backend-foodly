const { default: mongoose } = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    otp: {
        type: String,
        require: false,
        default: "none"
    },
    fcm: {
        type: String,
        require: false,
        default: "none"
    },

    password: {
        type: String,
        require: true,
    },
    verification: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        default: "0987654321",
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        require: false,
        default: "6910a737f985ca0296e56139",
    },
    userType: {
        type: String,
        require: true, default: "Client", enum: ["Client", "Admin", "Vendor", "Driver"]
    },
    profile: {
        type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",

    }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);