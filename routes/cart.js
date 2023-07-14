const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Sequelize = require("sequelize");
const { ProductosCarrito } = require("../models");

//CARRITO SE CREA CON SIGN UP

//RUTA GET PARA VER PRODUCTOS DE CARRITO

router.get("/:cartId", (req, res) => {
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
});
//AGREGAR UN PRODUCTO AL CARRITO

router.post("/add/:cartId/:productId", (req, res) => {
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
});

//VARIANTE
router.post("/addd/:cartId/:productId", (req, res) => {
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);
  let quantity;
  if (req.body.quantity) quantity = Number(req.body.quantity);

  ProductosCarrito.create({
    quantity,
  })
    .then((productoCarrito) => {
      Cart.findByPk(cartId).then((cart) => {
        productoCarrito.setCart(cart);
        Product.findByPk(productId).then((product) => {
          productoCarrito.setProduct(product);
        });
      });
      res.status(201).send("ok");
    })
    .catch((error) => console.log(error));
});

router.get("/prodCarrito/:cartId", (req, res) => {
  const cartId = Number(req.params.cartId);

  ProductosCarrito.findAll({
    where: { CartId: cartId },
    include: { model: Product },
  })
    .then((productosCarrito) => {
      console.log("result", productosCarrito);
      res.status(201).send(productosCarrito);
    })
    .catch((error) => console.log(error));
});

//ELIMINAR PRODUCTO DE CARRITO

router.put("/delete/:cartId/:productId", (req, res) => {
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
});

module.exports = router;
