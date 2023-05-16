const User = require("./User");
const Favorite = require("./Favorite");
const Purchase = require("./Purchase");
const Product = require("./Product");
const Cart = require("./Cart");

Favorite.belongsTo(User);
User.hasMany(Favorite);

User.hasMany(Purchase);
Purchase.belongsTo(User, { as: "buyer" });

Cart.belongsTo(User, { as: "cartOwner" });
User.hasOne(Cart, { as: "cartOwner" });

Cart.hasMany(Product);
Product.belongsTo(Cart);

Purchase.belongsToMany(Product, { through: "purchaseProducts" });
Product.belongsToMany(Purchase, { through: "purchaseProducts" });

Favorite.belongsToMany(Product, { through: "favoriteProducts" });
Product.belongsToMany(Favorite, { through: "favoriteProducts" });

module.exports = { User, Favorite, Purchase, Product, Cart };
