const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");

router.get("/", (req, res) => {
  res.send("entre");
});

module.exports = router;
