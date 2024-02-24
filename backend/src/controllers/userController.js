const PepcoAccountListings = require("../models/PepcoAccountListingsModel");
const WashgasDownloadLog = require("../models/WashgasDownloadLogModel");
const WsscAccountListings = require("../models/WSSCAccountListingsModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.getUserData = async (req, res) => {
  console.log("Fetching user data");
  try {
    const user = req.user;
    let pepcoData = null,
      washgasData = null,
      wsscData = null;

    // Fetch Pepco account data if the user has a pepcoAccountNo
    if (user.pepcoAccountNo) {
      pepcoData = await PepcoAccountListings.findAll({
        where: { account_owner_id: user.pepcoAccountNo },
      });
    }

    if (user.washgasAccountNo) {
      // Attempt conversion; be cautious of potential precision loss for very large numbers
      const accountOwnerId = parseInt(user.washgasAccountNo, 10);

      if (!isNaN(accountOwnerId)) {
        // Ensure conversion was successful
        washgasData = await WashgasDownloadLog.findAll({
          where: { account_owner_id: accountOwnerId },
        });
      }
    }

    if (user.wsscAccountNo) {
      const accountOwnerId = parseInt(user.wsscAccountNo, 10);
      wsscData = await WsscAccountListings.findAll({
        where: { account_owner_id: accountOwnerId },
      });
    }

    // Respond with the fetched data; nulls indicate no data found or no account number present for the user
    res.json({
      pepcoData,
      washgasData,
      wsscData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user data", error: error.message });
  }
};

exports.updateAccounts = async (req, res) => {
  const userId = req.params.userid;
  console.log(userId);
  let { pepcoAccountNo, washgasAccountNo, wsscAccountNo } = req.body || {};
  pepcoAccountNo = pepcoAccountNo || "0";
  washgasAccountNo = washgasAccountNo || "0";
  wsscAccountNo = wsscAccountNo || "0";
  const updateData = {
    ...(pepcoAccountNo && { pepcoAccountNo }),
    ...(washgasAccountNo && { washgasAccountNo }),
    ...(wsscAccountNo && { wsscAccountNo }),
  };
  console.log("updated data", updateData);
  try {
    const user = await User.findByPk(userId);
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with the provided data
    // Be cautious to only update allowed fields to prevent security issues
    console.log("update call", await user.update(updateData));

    const updatedUserData = {
      id: user.id,
      firstName: user.firstName,
      role: user.role,
      pepcoAccountNo: pepcoAccountNo || "",
      washgasAccountNo: washgasAccountNo || "",
      wsscAccountNo: wsscAccountNo || "",
    };
    console.log("updated data ", updatedUserData);
    const newToken = jwt.sign(updatedUserData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("token ", newToken);

    res
      .status(200)
      .json({ message: "Account updated successfully", token: newToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
