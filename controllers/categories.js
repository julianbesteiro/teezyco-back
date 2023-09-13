const asyncHandler = require("express-async-handler");
const { Category } = require("../models");

exports.categories = asyncHandler(async (req, res) => {
  Category.findAll({ order: [["id", "ASC"]] }).then((categories) => {
    const categoriesList = categories.map((category) => category.dataValues);
    res.send(categoriesList);
  });
})

exports.createCategories = asyncHandler(async (req, res) => {
  const { title, image } = req.body;
  Category.create({
    title: title.toLowerCase(),
    image: image.toLowerCase(),
  })
    .then((category) => {
      res.status(201).send(category);
    })
    .catch((error) => console.log(error));
})

exports.deleteCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;

  Category.destroy({ where: { id } })
    .then(() => {
      res.status(202).send("Categoria eliminada");
    })
    .catch((error) => console.log(error));
})

exports.modCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;

  Category.update(req.body, { where: { id } })
    .then(() => res.status(200).send("Category updated successfully"))
    .catch((error) => console.log(error));
})