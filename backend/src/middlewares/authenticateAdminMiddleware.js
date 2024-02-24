const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const authenticateAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing." });
  }

  const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access denied" });
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Invalid or expired token." });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "User not found." });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }
    if (req.params) {
      req.params.userid = req.params.userid;
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateAdmin;
