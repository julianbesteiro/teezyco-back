const asyncHandler = require("express-async-handler");
const { Product } = require("../models");

exports.obtenerFavorites = asyncHandler(async  (req, res) => {
  Product.findAll({ order: [["id", "ASC"]] }).then((productos) => {
    const productitos = productos.map((product) => product.dataValues);
    res.send(productitos);
  });
})
exports.obtenerUnFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  Product.findByPk(id).then((product) => {
    if (product) return res.send(product);
    if (!product) return res.send("Por aqui no hay nada");
  });
})
exports.createFavorite = asyncHandler(async (req, res) => {
  const { size, color, categoryId, stock, price, title, description, image } =
    req.body;

  Product.create({
    size: size.toLowerCase(),
    color: color.toLowerCase(),
    categoryId: categoryId,
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
})
exports.deleteFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  Product.destroy({ where: { id } })
    .then(() => {
      res.status(202).send("Producto eliminado");
    })
    .catch((error) => console.log(error));
})
exports.modFavorite = asyncHandler(async  (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  Product.update(updatedFields, { where: { id } })
    .then(() => res.status(200).send("Product updated successfully"))
    .catch((error) => console.log(error));
})
exports.searchFavorite = asyncHandler(async (req, res) => {
  const { term } = req.params;

  if (term !== "undefined") {
    Product.findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            title: {
              [Sequelize.Op.substring]: term.toLowerCase(),
            },
          },
          {
            categoryId: {
              [Sequelize.Op.eq]: term,
            },
          },
          {
            description: {
              [Sequelize.Op.substring]: term.toLowerCase(),
            },
          },
        ],
      },
    })
      .then((productos) => {
        res.send(productos);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error al buscar productos");
      });
  }
})
