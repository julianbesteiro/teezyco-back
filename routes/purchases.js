const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Sequelize = require("sequelize");

router.get("/all", (req, res) => {
  Purchase.findAll({ order: [["id", "ASC"]] }).then((purchases) => {
    res.send(purchases.map((purchase) => purchase.dataValues));
  });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  Purchase.findAll({ where: { userId: userId } }).then((purchases) => {
    const purchasesParaFront = purchases.map((purchase) => purchase.dataValues);

    res.send(purchasesParaFront);
  });
});

router.post("/confirm/:cartId", (req, res) => {
  const cartId = Number(req.params.cartId);
  const { productsPurchase } = req.body;

  Cart.findByPk(cartId).then((cart) => {
    const products = [];

    Cart.update({ products }, { where: { id: cartId } })
      .then(() => {
        console.log("Carrito vaciado");
      })
      .catch((error) => console.log(error));
  });

  //ACTUALIZAR STOCK

  productsPurchase.map((product) => {
    return Product.update(
      {
        stock: Sequelize.literal(`stock - ${product.quantity}    `),
      },
      { where: { id: product.id } }
    );
  });

  //CREAR COMPRA

  Purchase.create({
    products: productsPurchase,
    userId: cartId,
  })
    .then((purchase) => res.send(purchase.dataValues))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
