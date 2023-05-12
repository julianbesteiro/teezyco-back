const express = require("express");
const router = express.Router();
const routerUsers = require("./users");
const routerCart = require("./cart");
const routerProducts = require("./products");
const routerPurchases = require("./purchases");

router.use("/users", routerUsers);

router.use("/products", routerProducts);

router.use("/cart", routerCart);

router.use("/purchases", routerPurchases);

module.exports = router;
