const userModel = require("./user.model");

class UserController {
    async getUser(req, res) {
        try {
            const user = await userModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            const { password, __v, createAt, ...userData } = user._doc;
            res.status(200).json({ userData });
        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    }

    async verifiedAccount(req, res) {
        const userOtp = req.params.otp;
        try {
            const user = await userModel.findById(req.user.id);
            console.log("user:", user);
            if (!user) {
                res.status(400).json({ status: false, message: "user not found" });
            }
            // 2. Compare OTP
            if (user.otp != userOtp) {
                return res.status(400).json({ status: false, message: "OTP verification failed" });
            }


            user.verification = true;
            user.otp = "none";
            await user.save();
            // 4. Clean up sensitive fields before sending
            const { password, otp, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others });

        } catch (e) {
            console.error("Error in verifiedAccount:", e);
            res.status(500).json({ error: e.message });
        }

    }

    async verificationPhone(req, res) {
        const phone = req.params.phone;

        console.log("req.user.id:", req.user.id);
        try {
            const user = await userModel.findById(req.user.id);
            if (!user) {
                res.status(400).json({ status: false, message: "user not found" });
            }
            // if (user.phone !== phone) {
            //     return res.status(400).json({ status: false, message: "Phone verification failed" });
            // }
            user.phoneVerified = true;
            user.phone = phone;
            await user.save();
            console.log(user);
            const { password: __v, otp, createAt, ...others } = user._doc;
            res.status(200).json({ ...others });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }

    }
}

module.exports = new UserController();

