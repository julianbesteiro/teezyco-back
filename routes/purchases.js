const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");

router.get("/all", (req, res) => {
  Purchase.findAll().then((purchases) => {
    console.log("PURCHASES", purchases);
    res.send(purchases.map((purchase) => purchase.dataValues));
  });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("user id", typeof userId);

  Purchase.findAll({ where: { userId: userId } }).then((purchases) => {
    console.log("PURCHASES", purchases);

    const purchasesParaFront = purchases.map((purchase) => purchase.dataValues);

    console.log("PURCHASES2", purchasesParaFront);

    res.send(purchasesParaFront);
  });
});

router.post("/confirm/:cartId", (req, res) => {
  const cartId = Number(req.params.cartId);
  const { productsPurchase } = req.body;

  //REQ BODY TRAE USER ID, DETALLE DE COMPRA (PRODUCTOS, CANTIDADES, PRECIO UNITARIO), PRECIO FINAL
  //VACIAR CARRITO
  Cart.findByPk(cartId).then((cart) => {
    const products = [];

    Cart.update({ products }, { where: { id: cartId } })
      .then(() => {
        console.log("Carrito vaciado");
      })
      .catch((error) => console.log(error));
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
