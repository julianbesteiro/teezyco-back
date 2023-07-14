const User = require("./User");
const Purchase = require("./Purchase");
const Product = require("./Product");
const Cart = require("./Cart");
const Category = require("./Category");
const ProductosCarrito = require("./ProductosCarrito");
const ProductosPurchase = require("./ProductosPurchase");
const Favorite = require("./Favorite");

User.belongsToMany(Product, { through: "userFavorites" });
Product.belongsToMany(User, { through: "userFavorites" });

User.hasMany(Purchase);
Purchase.belongsTo(User);

Cart.belongsTo(User);
User.hasOne(Cart);

Favorite.belongsTo(User);
User.hasOne(Favorite);

Category.hasMany(Product);
Product.belongsTo(Category);

ProductosCarrito.belongsTo(Product);
Product.hasMany(ProductosCarrito);

ProductosCarrito.belongsTo(Cart);
Cart.hasOne(ProductosCarrito);

ProductosPurchase.belongsTo(Product);
Product.hasMany(ProductosPurchase);

ProductosPurchase.belongsTo(Purchase);
Purchase.hasOne(ProductosPurchase);

module.exports = {
  User,
  Purchase,
  Product,
  Cart,
  Category,
  ProductosCarrito,
  ProductosPurchase,
  Favorite,
};
