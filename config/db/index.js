const Sequelize = require("sequelize");

const db = new Sequelize("teezyco", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
