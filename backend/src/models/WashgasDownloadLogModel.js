const { sequelize, DataTypes } = require("../config/dbConfig");

const WashgasDownloadLog = sequelize.define(
  "WashgasDownloadLog",
  {
    ID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Client_ID: {
      type: DataTypes.INTEGER,
    },
    account_owner_id: {
      type: DataTypes.BIGINT,
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
  },
  {
    tableName: "washgas_download_log",
    timestamps: false,
  }
);

module.exports = WashgasDownloadLog;
