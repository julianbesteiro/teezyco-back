const sequelize = require("sequelize");
const db = require("../db");

class Purchase extends sequelize.Model {}

Purchase.init(
  {
    orders: { type: sequelize.ARRAY(sequelize.JSONB), allowNull: false },
    date: { type: sequelize.DATE, allowNull: false },
  },
  { sequelize: db, modelName: "Purchase" }
);

module.exports = Purchase;
