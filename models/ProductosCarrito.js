const sequelize = require("sequelize");
const db = require("../config/db");

class ProductosCarrito extends sequelize.Model {}

ProductosCarrito.init(
  {
    quantity: { type: sequelize.INTEGER },
  },
  { sequelize: db, modelName: "ProductosCarrito" }
);

module.exports = ProductosCarrito;
