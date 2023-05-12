const sequelize=require('sequelize')
const db=require("../db")


class Favorite extends sequelize.Model{}

Favorite.init({
  
},{sequelize:db, modelName: 'Favorite'});

module.exports=Favorite