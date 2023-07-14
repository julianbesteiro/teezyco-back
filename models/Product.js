const sequelize = require("sequelize");
const db = require("../config/db");

class Product extends sequelize.Model {}

Product.init(
  {
    size: { type: sequelize.STRING, allowNull: false },
    color: { type: sequelize.STRING, allowNull: false },
    categoryId: { type: sequelize.STRING, allowNull: false },
    stock: { type: sequelize.INTEGER, allowNull: false },
    price: { type: sequelize.INTEGER, allowNull: false },
    title: { type: sequelize.STRING, allowNull: false },
    description: { type: sequelize.TEXT, allowNull: false },
    image: { type: sequelize.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "Product" }
);

module.exports = Product;
