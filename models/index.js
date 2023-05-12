const User=require("./User")
const Favorite=require('./Favorite')
const Purchase=require('./Purchase')
const Product=require('./Product')
const Cart=require('./Cart')

User.hasMany(Favorite)
User.hasMany(Purchase, { as: 'orders' });
User.hasOne(Cart)
Purchase.belongsTo(User, { as: 'buyer' });
Purchase.hasMany(Product)
Product.belongsToMany(Purchase)
Favorite.belongsTo(User)
Favorite.hasMany(Product)
Product.belongsToMany(Favorite)
Product.belongsToMany(Cart)
Cart.hasMany(Product);
Cart.belongsTo(User)

module.exports=User