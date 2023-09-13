const express = require("express");
const router = express.Router();

const { allPurchases, onePurchases, postPurchases } = require("../controllers/purchases");

router.get("/all", allPurchases);

router.get("/:userId",onePurchases );

router.post("/confirm/:cartId", postPurchases);

module.exports = router;
