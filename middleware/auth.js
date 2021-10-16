const config = require('../config/config');
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const accessToken = req.header("x-auth-token");
    if (!accessToken) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(accessToken, config.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};