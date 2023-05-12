const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

router.post("/create", (req, res) => {
  Product.findOrCreate({ where: { id }, defaults: req.body }).then(
    (product) => {
      res.status(201).send(product[0].dataValues);
    }
  );
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
