const express = require("express");
const router = express.Router();
const routerUsers = require("./users");
const routerCart = require("./cart");
const routerProducts = require("./products");
const routerPurchases = require("./purchases");
const routerFavorite = require("./favorite");
const routerCategories = require("./categories");

router.use("/users", routerUsers);

router.use("/products", routerProducts);

router.use("/cart", routerCart);

router.use("/purchases", routerPurchases);

router.use("/favorite", routerFavorite);

router.use("/categories", routerCategories);

module.exports = router;
