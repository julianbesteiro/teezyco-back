const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");


router.get('/', (req, res) => {
  res.send('entre')
})

router.post('/login', (req, res) =>{
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(password)
        .then((isValid) => {
          if (!isValid) return res.sendStatus(401);

          const payload = {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
          };

          const token = generateToken(payload);

          console.log('Token:', token);
          res.cookie("token", token);
          res.send(payload);
        });
    });
});

router.post('/signup',(req, res)=>{
  console.log('entreeeeeee ',req.body);
  User.findOrCreate({where:{email},defaults: req.body})
  .then((user)=>{res.send(user[0].dataValues)})
  .catch((error)=>{console.log(error)})
} )

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

module.exports = router;