const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "pepcoAccountNo",
        "washgasAccountNo",
        "wsscAccountNo",
        "role",
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userid;
  let { pepcoAccountNo, washgasAccountNo, wsscAccountNo } = req.body || {};
  pepcoAccountNo = pepcoAccountNo || "0";
  washgasAccountNo = washgasAccountNo || "0";
  wsscAccountNo = wsscAccountNo || "0";
  const updateData = {
    ...(pepcoAccountNo && { pepcoAccountNo }),
    ...(washgasAccountNo && { washgasAccountNo }),
    ...(wsscAccountNo && { wsscAccountNo }),
  };
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with the provided data
    // Be cautious to only update allowed fields to prevent security issues
    await user.update(updateData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userid;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.pepcoAccountNo) userData.pepcoAccountNo = null;
    if (!userData.washgasAccountNo) userData.washgasAccountNo = null;
    if (!userData.wsscAccountNo) userData.wsscAccountNo = null;

    const newUser = await User.create(userData);

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
