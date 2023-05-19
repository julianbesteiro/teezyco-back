const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("entre");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        id: user.id,
      };

      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
});

router.post("/signup", (req, res) => {
  User.create(req.body)
    .then((user) => {
      Cart.create()
        .then((cart) => cart.setCartOwner(user))
        .then(() => res.send("Usuario creado con su carrito"));
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;

  User.update(req.body, { where: { id } })
    .then(() => res.status(200).send("Datos de usuario actualizados"))
    .catch((error) => console.log(error));
});

//RUTAS USER ADMIN

router.get("/all", (req, res) => {

  User.findAll({ order: [["id", "ASC"]] }).then((users) => {
    console.log("USERS", users);

    res.send(users.map((user) => user.dataValues));
  });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id } })
    .then((user) => {
      res.status(202).send("Usuario eliminado");
    })
    .catch((error) => console.log(error));
});

router.put("/changeadmin/:id", (req, res) => {
  const { id } = req.params;

  User.findOne({ where: { id } })
    .then((user) => {
      const status = !user.admin;

      User.update({ admin: status }, { where: { id } });
    })
    .then(() => res.status(200).send("Usuario actualizado"))
    .catch((error) => console.log(error));
});

module.exports = router;
