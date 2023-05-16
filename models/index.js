const User = require("./User");
const Favorite = require("./Favorite");
const Purchase = require("./Purchase");
const Product = require("./Product");
const Cart = require("./Cart");

User.hasMany(Favorite);
Favorite.belongsTo(User);

// User.hasMany(Purchase, { as: "orders" });
// Purchase.belongsTo(User, { as: "buyer" });

Cart.belongsTo(User, { as: "cartOwner" });

// Cart.hasMany(Product);
// Product.belongsToMany(Cart);

// Purchase.hasMany(Product);
// Product.belongsToMany(Purchase);

// Favorite.hasMany(Product);
// Product.belongsToMany(Favorite);

module.exports = { User, Favorite, Purchase, Product, Cart };
