const rateLimit = require("express-rate-limit");

function getClientKey(req) {
    // If you have auth middleware that sets req.user
    return req.user?.id || req.ip;
}

//* General API limiter (safe for most routes)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => getClientKey(req),
    handler: (req, res) => {
        return res.status(429).json({
            status: false,
            message: "Too many requests. Please try again later.",
        });
    },
});

// Strict limiter for login/register/otp
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip, // auth routes: IP based
    handler: (req, res) => {
        return res.status(429).json({
            status: false,
            message: "Too many attempts. Wait 10 minutes and try again.",
        });
    },
});

module.exports = { apiLimiter, authLimiter };