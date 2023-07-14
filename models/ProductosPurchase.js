const sequelize = require("sequelize");
const db = require("../config/db");

class ProductosPurchase extends sequelize.Model {}

ProductosPurchase.init(
  {
    quantity: { type: sequelize.INTEGER },
  },
  { sequelize: db, modelName: "ProductosPurchase" }
);

module.exports = ProductosPurchase;
