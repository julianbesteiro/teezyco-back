const sequelize = require("sequelize");
const db = require("../config/db");

class Cart extends sequelize.Model {}

Cart.init(
  {
    products: { type: sequelize.ARRAY(sequelize.JSONB), defaultValue: [] },
  },
  { sequelize: db, modelName: "Cart" }
);

module.exports = Cart;
