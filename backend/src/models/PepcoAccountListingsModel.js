const { sequelize, DataTypes } = require("../config/dbConfig");

const PepcoAccountListings = sequelize.define(
  "PepcoAccountListings",
  {
    client_id: {
      type: DataTypes.BIGINT,
    },
    account_owner_id: {
      type: DataTypes.STRING,
    },
    account_number: {
      type: DataTypes.STRING,
    },
    bill_date: {
      type: DataTypes.DATEONLY,
    },
    download_date: {
      type: DataTypes.DATEONLY,
    },
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "pepco_account_listings",
    timestamps: false,
  }
);

module.exports = PepcoAccountListings;
