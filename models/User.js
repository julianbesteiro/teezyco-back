const sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends sequelize.Model {
  createHash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword = function (password) {
    return this.createHash(password, this.salt).then((hash) => {
      return hash === this.password;
    });
  };
}

User.init(
  {
    email: { type: sequelize.STRING, allowNull: false, unique: true },
    name: { type: sequelize.STRING, allowNull: false },
    lastName: { type: sequelize.STRING, allowNull: false },
    password: { type: sequelize.STRING, allowNull: false },
    admin: { type: sequelize.BOOLEAN, defaultValue: false },
    salt: { type: sequelize.STRING },
  },
  { sequelize: db, modelName: "User" }
);

User.addHook("beforeCreate", "hashPassword", (user, options) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.createHash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
