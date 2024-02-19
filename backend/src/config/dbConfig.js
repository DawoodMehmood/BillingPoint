const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: "mssql",
  dialectOptions: {},
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
  }
);

async function getSchema() {
  try {
    const tables = await sequelize.query(
      `
        SELECT
          TABLE_NAME
        FROM
          INFORMATION_SCHEMA.TABLES
        WHERE
          TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG=?
      `,
      { replacements: [dbConfig.database], type: Sequelize.QueryTypes.SELECT }
    );

    console.log(tables);
  } catch (error) {
    console.error("Error fetching tables", error);
  }
}
async function getColumnDetails(tableName) {
  try {
    const columns = await sequelize.query(
      `
          SELECT
            COLUMN_NAME,
            DATA_TYPE
          FROM
            INFORMATION_SCHEMA.COLUMNS
          WHERE
            TABLE_NAME = ?
          ORDER BY
            ORDINAL_POSITION
        `,
      {
        replacements: [tableName],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(`Columns in ${tableName}:`, columns);
  } catch (error) {
    console.error("Error fetching columns", error);
  }
}
async function getSampleData(tableName) {
  try {
    const sampleData = await sequelize.query(
      `SELECT * FROM ${tableName} ORDER BY (SELECT NULL) OFFSET 0 ROWS FETCH NEXT 15 ROWS ONLY`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(`Sample data from ${tableName}:`, sampleData);
  } catch (error) {
    console.error("Error fetching sample data", error);
  }
}

getSchema();
getColumnDetails("users");
// getSampleData("washgas_download_log");

module.exports = { sequelize, DataTypes };
