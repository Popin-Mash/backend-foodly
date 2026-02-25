const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        //* no need bearer 
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is not valid!" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Client" ||
            req.user.userType === "Admin" ||
            req.user.userType === "Vendor" ||
            req.user.userType === "Driver") {
            next();
        } else {
            res.status(403).json("You are not allowed to access the resource!");
        }
    });
};
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin") {
            next();
        } else {
            res.status(403).json("You are not allowed to access the resource!");
        }
    });
}
const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Vendor") {
            next();
        } else {
            res.status(403).json("You are not allowed to access the resource!");
        }
    });
}
const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Driver") {
            next();
        } else {
            res.status(403).json("You are not allowed to access the resource!");
        }
    });
}

module.exports = {
    verifyToken, verifyTokenAndAuthorization, verifyAdmin, verifyVendor, verifyDriver

}