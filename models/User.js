const sequelize=require('sequelize')
const db=require("../db")
const bcrypt=require('bcrypt')

class User extends sequelize.Model{
  createHash(password, salt){
    return bcrypt.hash(password, salt)
  }

  validatePassword = function(password){
    console.log('Validating password for user:', this.email);
    return this.createHash(password, this.salt).then((hash)=>{
      console.log('Generated hash:', hash);
      console.log('User hash:', this.password);
      return hash===this.password;
    });
  }
  
}

User.init({
  email: {type: sequelize.STRING, allowNull: false},
  user: {type: sequelize.STRING, allowNull: false},
  name: {type: sequelize.STRING, allowNull: false},
  lastName: {type: sequelize.STRING, allowNull: false},
  password: {type: sequelize.STRING, allowNull: false},
  admin: {type: sequelize.BOOLEAN, defaultValue: false},
  salt: {type: sequelize.STRING}
},{sequelize:db, modelName: 'User'});



User.addHook('beforeCreate', 'hashPassword', (user, options)=>{
  const salt=bcrypt.genSaltSync(8)
  user.salt= salt
  return user.createHash(user.password, salt).then((hash)=>{
    user.password = hash;
  })
})

module.exports = User