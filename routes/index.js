const express = require("express");
const router = express.Router();
const routerUsers = require("./users");
const routerCart = require("./cart");
const routerProducts = require("./products");
const routerPurchases = require("./purchases");
const routerFavorite = require('./favorite')

router.use("/users", routerUsers);

router.use("/products", routerProducts);

router.use("/cart", routerCart);

router.use("/purchases", routerPurchases);

router.use('/favorite', routerFavorite)

module.exports = router;
