const { sequelize, DataTypes } = require("../config/dbConfig");

const WsscAccountListings = sequelize.define(
  "WsscAccountListings",
  {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.TINYINT,
    },
    account_owner_id: {
      type: DataTypes.INTEGER,
    },
    account_number: {
      type: DataTypes.BIGINT,
    },
    due_date: {
      type: DataTypes.DATEONLY,
    },
    bill_date: {
      type: DataTypes.DATEONLY,
    },
    download_date: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "wssc_account_listings",
    timestamps: false,
  }
);

module.exports = WsscAccountListings;
