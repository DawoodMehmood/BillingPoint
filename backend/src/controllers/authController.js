const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authController = {
  async signup(req, res) {
    const userData = req.body.formData || {};
    console.log("userData", userData);
    if (userData.adminCode === process.env.ADMIN_CREATION_CODE) {
      userData.role = "admin";
    } else {
      userData.role = "user";
    }
    delete userData.adminCode;

    if (!userData.pepcoAccountNo) userData.pepcoAccountNo = null;
    if (!userData.washgasAccountNo) userData.washgasAccountNo = null;
    if (!userData.wsscAccountNo) userData.wsscAccountNo = null;

    try {
      const user = await User.create(userData);
      if (user.role === "admin") {
        const token = jwt.sign(
          { id: user.id, firstName: user.firstName, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(201).json({
          message: "Account created successfully",
          token: token,
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            firstName: user.firstName,
            role: user.role,
            pepcoAccountNo: user.pepcoAccountNo,
            washgasAccountNo: user.washgasAccountNo,
            wsscAccountNo: user.wsscAccountNo,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(201).json({
          message: "Account created successfully",
          token: token,
        });
      }
    } catch (error) {
      console.log("Error in signup controller ", error);
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({
          message:
            "Authentication failed. User not found or password incorrect.",
        });
      }

      if (user.role === "admin") {
        const token = jwt.sign(
          { id: user.id, firstName: user.firstName, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.json({
          message: "Logged in successfully",
          token: token,
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            firstName: user.firstName,
            role: user.role,
            pepcoAccountNo: user.pepcoAccountNo,
            washgasAccountNo: user.washgasAccountNo,
            wsscAccountNo: user.wsscAccountNo,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.json({
          message: "Logged in successfully",
          token: token,
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authController;
