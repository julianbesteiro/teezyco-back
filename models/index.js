const User=require("./User")
const Favorite=require('./Favorite')
 
Favorite.belongsTo(User)
User.hasMany(Favorite)

module.exports=User