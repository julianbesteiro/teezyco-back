const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Sequelize = require("sequelize");
const { Product, Purchase } = require("../models");



exports.allPurchases = asyncHandler(async  (req, res) => {
  Purchase.findAll({ order: [["id", "ASC"]] }).then((purchases) => {
    res.send(purchases.map((purchase) => purchase.dataValues));
  });
})
exports.onePurchases = asyncHandler(async  (req, res) => {
  const { userId } = req.params;

  Purchase.findAll({ where: { userId: userId } }).then((purchases) => {
    const purchasesParaFront = purchases.map((purchase) => purchase.dataValues);

    res.send(purchasesParaFront);
  });
})
exports.postPurchases = asyncHandler(async (req, res) => {
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
} )