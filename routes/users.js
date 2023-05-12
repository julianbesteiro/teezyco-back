const express = require("express");
const router = express.Router();
const User = require("../models/User");
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
      };

      const token = generateToken(payload);

      console.log("Token:", token);
      res.cookie("token", token);
      res.send(payload);
    });
  });
});

router.post("/signup", (req, res) => {
  console.log("entreeeeeee ", req.body);

  const { email } = req.body;

  User.findOrCreate({ where: { email }, defaults: req.body })
    .then((user) => {
      res.send(user[0].dataValues);
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
  User.findAll().then((users) => {
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

router.put("/promote/:id", (req, res) => {
  const { id } = req.params;

  User.update({ admin: true }, { where: { id } })
    .then(() => res.status(200).send("Usuario actualizado"))
    .catch((error) => console.log(error));
});

module.exports = router;
