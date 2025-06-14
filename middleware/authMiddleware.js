const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "No Token Provided" });
        }
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Unauthorized" });
        }       
    }
};