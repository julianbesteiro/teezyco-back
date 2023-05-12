const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("entre");
});

module.exports = router;
