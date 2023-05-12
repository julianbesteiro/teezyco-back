const sequelize=require('sequelize')
const db=require("../db")


class Purchase extends sequelize.Model{}

Purchase.init({
  userId: {type: sequelize.STRING, allowNull: false},
  orders: {type: sequelize.ARRAY(sequelize.JSONB), allowNull: false},
 
},{sequelize:db, modelName: 'Purchase'});

module.exports= Purchase