const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");

//CARRITO SE CREA CON SIGN UP

//RUTA GET PARA VER PRODUCTOS DE CARRITO

router.get("/:cartId", (req, res) => {
  const cartId = Number(req.params.cartId);

  Cart.findByPk(cartId)
    .then((cart) => {
      console.log("CART EN GET", cart.dataValues.products);
      res.send(cart);
    })
    .catch((error) => console.log(error));
});

//AGREGAR UN PRODUCTO AL CARRITO

router.post("/add/:cartId/:productId", (req, res) => {
  const productId = req.params.productId;
  const cartId = Number(req.params.cartId);

  Cart.findByPk(cartId)
    .then((cart) => {
      const products = cart.dataValues.products;

      console.log("PROD ID", productId);
      if (products.find((prod) => prod === productId)) {
        console.error("El producto ya está en el carrito");
      } else {
        products.push({ remera: 2 });
        console.log("PRODUCTS POST PUSH", products);
        //products = [...products, { productId: 1 }];

        Cart.update({ products }, { where: { id: cartId } }).then(() => {
          res.send("El product fue agregado al carrito");
        });
      }
    })
    .catch((error) => console.log(error));
});

//MODIFICAR CANTIDAD DE PRODUCTOS DEL CARRITO

router.put("/quantity/:cartId/:productId", (req, res) => {
  const quantity = Number(req.body.quantity);
  const cartId = Number(req.params.cartId);
  const productId = req.params.productId;

  Cart.findByPk(cartId).then((cart) => {
    const products = cart.dataValues.products;

    products.map((prod) => {
      if (Object.keys(prod)[0] === productId) {
        prod[Object.keys(prod)[0]] = quantity;
      }
    });

    Cart.update({ products }, { where: { id: cartId } })
      .then(() => {
        res.status(202).send("Cantidad de productos actualizada");
      })
      .catch((error) => console.log(error));
  });
});

//ELIMINAR PRODUCTO DE CARRITO

router.put("/delete/:cartId/:productId", (req, res) => {
  const cartId = Number(req.params.cartId);
  const productId = req.params.productId;

  Cart.findByPk(cartId).then((cart) => {
    const products = cart.dataValues.products;

    const productsFiltrado = products.filter(
      (prod) => Object.keys(prod)[0] !== productId
    );

    console.log("PRODUCTS DESPUES DE FILTER", productsFiltrado);

    Cart.update({ products: productsFiltrado }, { where: { id: cartId } })
      .then(() => {
        res.status(202).send("Producto eliminado del carrito");
      })
      .catch((error) => console.log(error));
  });
});

module.exports = router;
