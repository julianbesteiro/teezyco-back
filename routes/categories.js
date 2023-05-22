const express = require("express");
const router = express.Router();
const { Category } = require("../models");
const Sequelize = require("sequelize");

// Ruta para obtener todos los productos del usuario
router.get("/all", (req, res) => {
  Category.findAll({ order: [["id", "ASC"]] }).then((categories) => {
    const categoriesList = categories.map((category) => category.dataValues);
    res.send(categoriesList);
  });
});

//RUTAS CATEGORIES ADMIN

router.post("/create", (req, res) => {
  const { title, image } = req.body;
  Category.create({
    title: title.toLowerCase(),
    image: image.toLowerCase(),
  })
    .then((category) => {
      res.status(201).send(category);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Category.destroy({ where: { id } })
    .then(() => {
      res.status(202).send("Categoria eliminada");
    })
    .catch((error) => console.log(error));
});

router.put("/mod/:id", (req, res) => {
  const { id } = req.params;

  Category.update(req.body, { where: { id } })
    .then(() => res.status(200).send("Category updated successfully"))
    .catch((error) => console.log(error));
});

module.exports = router;
