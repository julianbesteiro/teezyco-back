const asyncHandler = require("express-async-handler");

const { Cart } = require("../models");
const Product = require("../models/Product");
const Sequelize = require("sequelize");


exports.verCarrito = asyncHandler(async (req, res) => {
  const cartId = Number(req.params.cartId);

  Cart.findByPk(cartId)
    .then((cart) => {
      const productsIds = cart.dataValues.products.map((prod) =>
        Number(Object.keys(prod)[0])
      );

      Product.findAll({
        where: { id: { [Sequelize.Op.in]: productsIds } },
      }).then((products) => {
        products.map((product) => {
          product.dataValues.quantity = Number(
            Object.values(
              cart.dataValues.products[
                productsIds.indexOf(product.dataValues.id)
              ]
            )
          );

          product.dataValues;
        });
        res.send(products);
      });
    })
    .catch((error) => console.log(error));
}
);
exports.agregarAlCarrito = asyncHandler(async (req, res) => {
  let quantity;
  if (req.body.quantity) quantity = Number(req.body.quantity);
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);

  Cart.findByPk(cartId)
    .then((cart) => {
      const products = cart.dataValues.products;

      if (products.find((prod) => Number(Object.keys(prod)[0]) === productId)) {
        products.map((prod) => {
          if (Number(Object.keys(prod)[0]) === productId) {
            if (quantity == undefined) prod[Object.keys(prod)[0]] += 1;
            else {
              prod[Object.keys(prod)[0]] = quantity;
            }
          }
        });
      } else {
        if (quantity == undefined) products.push({ [productId]: 1 });
        else {
          products.push({ [productId]: quantity });
        }
      }

      Cart.update({ products }, { where: { id: cartId } }).then(() => {
        const productsIds = products.map((prod) =>
          Number(Object.keys(prod)[0])
        );

        Product.findAll({
          where: { id: { [Sequelize.Op.in]: productsIds } },
        }).then((products) => {
          products.map((product) => {
            product.dataValues;
          });
          res.send(products);
        });
      });
    })
    .catch((error) => console.log(error));
})

exports.eliminarDelCarrito = asyncHandler(async (req, res) => {
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);

  Cart.findByPk(cartId).then((cart) => {
    const products = cart.dataValues.products;

    const productsFiltrado = products.filter(
      (prod) => Number(Object.keys(prod)[0]) !== productId
    );

    Cart.update({ products: productsFiltrado }, { where: { id: cartId } })
      .then(() => {
        res.status(202).send("Producto eliminado del carrito");
      })
      .catch((error) => console.log(error));
  });
})