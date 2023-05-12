const sequelize=require('sequelize')
const db=require("../db")


class Cart extends sequelize.Model{}

Cart.init({
  userId: {type: sequelize.STRING, allowNull: false},
  orders: {type: sequelize.ARRAY(sequelize.INTEGER), allowNull: false},
 orders: [{prodA:9},{prodB: 10}]
},{sequelize:db, modelName: 'Cart'});

module.exports= Cart