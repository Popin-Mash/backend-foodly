const User = require("../user/user.model");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken')

const generate_otp = require("../../utils/otp_generate");
const sendEmail = require("../../utils/smtp_function");


class AuthController {
    async createUser(req, res) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        console.log("Incoming body:", req.body); // 🧠 check what you receive


        if (req.body.password < 8) {
            res.status(400).json({ status: false, message: "password should be at least 8 characters" })
        }
        const otp = generate_otp();
        console.log("Generate OTP:", otp);
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                userType: "Client",
                password: hashedPassword,
                otp: otp
            });
            await newUser.save();
            sendEmail(newUser.email, otp);
            res.status(201).json({ status: true, message: "Success create account" })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }
    async loginUser(req, res) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: 'Invalid email format' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ status: false, message: "JWT_SECRET is not configured" });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({ status: false, message: "Email does not exist" });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ status: false, message: "Password is incorrect" });
            }

            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: "21d" });

            const { password, otp, ...others } = user._doc;
            res.status(200).json({
                ...others,
                userToken
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "An error occurred during login",
                error: error.message
            });
        }
    }
}
module.exports = new AuthController();