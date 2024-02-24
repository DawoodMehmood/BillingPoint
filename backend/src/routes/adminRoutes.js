const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middlewares/authenticateAdminMiddleware");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/adminController");

router.get("/users", authenticateAdmin, getAllUsers);
router.post("/add-user", authenticateAdmin, addUser);
router.patch("/update/:userid", authenticateAdmin, updateUser);
router.delete("/delete/:userid", authenticateAdmin, deleteUser);

module.exports = router;
