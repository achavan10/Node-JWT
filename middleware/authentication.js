const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
