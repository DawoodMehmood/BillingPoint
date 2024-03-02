const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      console.log("User is an admin");
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }
    if (req.params) {
      req.params.userid = req.params.userid;
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.log("Error in authenticateUser middleware", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
