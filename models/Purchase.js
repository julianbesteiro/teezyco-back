const sequelize = require("sequelize");
const db = require("../db");

class Purchase extends sequelize.Model {}

Purchase.init(
  {
    userId: { type: sequelize.STRING, allowNull: false },
    products: { type: sequelize.ARRAY(sequelize.JSONB), defaultValue: [] },
  },
  { sequelize: db, modelName: "Purchase" }
);

module.exports = Purchase;
