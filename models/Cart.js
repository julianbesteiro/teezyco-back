const sequelize=require('sequelize')
const db=require("../db")


class Cart extends sequelize.Model{}

Cart.init({
  userId: {type: sequelize.STRING, allowNull: false},
  products: {type: sequelize.ARRAY(sequelize.JSONB), allowNull: false},
 
},{sequelize:db, modelName: 'Cart'});

module.exports= Cart