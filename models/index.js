const User = require("./User");
const Favorite = require("./Favorite");
const Purchase = require("./Purchase");
const Product = require("./Product");
const Cart = require("./Cart");

User.hasMany(Favorite);
Favorite.belongsTo(User);

// User.hasMany(Purchase, { as: "orders" });
// Purchase.belongsTo(User, { as: "buyer" });

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.hasMany(Product);
// Product.belongsToMany(Cart);

// Purchase.hasMany(Product);
// Product.belongsToMany(Purchase);

// Favorite.hasMany(Product);
// Product.belongsToMany(Favorite);

module.exports = { User, Favorite, Purchase, Product, Cart };
