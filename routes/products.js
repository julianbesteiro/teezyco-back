const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// Ruta para obtener todos los productos del usuario
router.get("/all", (req, res) => {
  Product.findAll().then((productos) => {
    console.log("productos", productos);
    res.send(
      productos.map((product) => {
        product.dataValues;
      })
    );
  });
});

// Ruta para obtener un solo producto
router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  Product.findByPk(id).then((product) => {
    if (product) return res.send("okkkk");
    if (!product) return res.send("1");
  });
});

//RUTAS PRODUCT ADMIN

router.post("/create", (req, res) => {
  const { size, color, model, stock, price, title, description, image } =
    req.body;
  Product.create({
    size: size.toLowerCase(),
    color: color.toLowerCase(),
    model: model.toLowerCase(),
    stock: stock,
    price: price,
    title: title.toLowerCase(),
    description: description.toLowerCase(),
    image: image.toLowerCase(),
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Product.destroy({ where: { id } })
    .then(() => {
      res.status(202).send("Producto eliminado");
    })
    .catch((error) => console.log(error));
});

router.put("/mod/:id", (req, res) => {
  const { id } = req.params;
  const { size, color, model, stock, price, title, description, image } =
    req.body;

  Product.update(
    {
      size: size,
      color: color,
      model: model,
      stock: stock,
      price: price,
      title: title,
      description: description,
      image: image,
    },
    { where: { id } }
  )
    .then((product) => res.status(200).send(product))
    .catch((error) => console.log(error));
});

//RUTA BUSCADOR

router.get("/search/:term", (req, res) => {
  const { term } = req.params;

  console.log("TERM", term);
  Product.findAll({
    where: {
      title: {
        [Sequelize.Op.substring]: term.toLowerCase(),
      },
    },
  })
    .then((productos) => {
      console.log("PRODUCTOS", productos);
      res.send(productos);
    })
    .catch((error) => {
      console.error("Error al buscar productos:", error);
      res.status(500).send("Error al buscar productos");
    });
});

module.exports = router;
