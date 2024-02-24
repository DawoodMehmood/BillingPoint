const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUserMiddleware");
const {
  getUserData,
  updateAccounts,
} = require("../controllers/userController");

router.get("/data", authenticateUser, getUserData);
router.patch("/update-accounts/:userid", authenticateUser, updateAccounts);

module.exports = router;
