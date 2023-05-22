const sequelize = require("sequelize");
const db = require("../db");

class Category extends sequelize.Model {}

Category.init(
  {
    title: { type: sequelize.STRING, allowNull: false, unique: true },
    image: { type: sequelize.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "Category" }
);

module.exports = Category;
