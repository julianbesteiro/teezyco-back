const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

router.get("/", (req, res) => {
  res.send("entre");
});


module.exports = router;
