const sequelize = require("sequelize");
const db = require("../config/db");

class Favorite extends sequelize.Model {}

Favorite.init(
  {
    products: { type: sequelize.ARRAY(sequelize.INTEGER), defaultValue: [] },
  },
  { sequelize: db, modelName: "Favorite" }
);

module.exports = Favorite;
