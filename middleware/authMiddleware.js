const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No Token Provided" });
        }
        
        // Extract token from "Bearer TOKEN" format
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader;
            
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Unauthorized" });
        }       
    }
};