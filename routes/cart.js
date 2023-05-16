const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

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
  let quantity;
  if (req.body.quantity) quantity = Number(req.body.quantity);
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);

  //  if (quantity == undefined) quantity = 1;

  Cart.findByPk(cartId)
    .then((cart) => {
      const products = cart.dataValues.products;

      if (products.find((prod) => Number(Object.keys(prod)[0]) === productId)) {
        console.error("El producto ya está en el carrito");

        products.map((prod) => {
          if (Number(Object.keys(prod)[0]) === productId) {
            console.log("QUANTITY", quantity);

            if (quantity == undefined) prod[Object.keys(prod)[0]] += 1;
            else {
              prod[Object.keys(prod)[0]] = quantity;
            }
          }
        });
      } else {
        products.push({ [productId]: 1 });
        console.log("PRODUCTS POST PUSH", products);
        //products = [...products, { productId: 1 }];
      }

      Cart.update({ products }, { where: { id: cartId } })
        .then(() => {
          //res.status(202).send("Carrito modificado correctamente");
        })
        .then(() => {
          console.log("PRODUCTS", products);

          products.map((prod) => {
            Product.findByPk(Number(Object.keys(prod)[0])).then(
              (product) => {}
            );

            return;
          });
          res.send(products);
        });
    })
    .catch((error) => console.log(error));
});

//MODIFICAR CANTIDAD DE PRODUCTOS DEL CARRITO

// router.put("/quantity/:cartId/:productId", (req, res) => {
//   const quantity = Number(req.body.quantity);
//   const cartId = Number(req.params.cartId);
//   const productId = Number(req.params.productId);

//   Cart.findByPk(cartId).then((cart) => {
//     const products = cart.dataValues.products;

//     products.map((prod) => {
//       if (Number(Object.keys(prod)[0]) === productId) {
//         prod[Object.keys(prod)[0]] = quantity;
//       }
//     });

//     Cart.update({ products }, { where: { id: cartId } })
//       .then(() => {
//         res.status(202).send("Cantidad de productos actualizada");
//       })
//       .catch((error) => console.log(error));
//   });
// });

//ELIMINAR PRODUCTO DE CARRITO

router.put("/delete/:cartId/:productId", (req, res) => {
  const cartId = Number(req.params.cartId);
  const productId = Number(req.params.productId);

  Cart.findByPk(cartId).then((cart) => {
    const products = cart.dataValues.products;

    const productsFiltrado = products.filter(
      (prod) => Number(Object.keys(prod)[0]) !== productId
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
