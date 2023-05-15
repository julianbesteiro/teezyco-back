const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// Ruta para obtener todos los productos del usuario
router.get('/all', (req, res) => {
 Product.findAll ().then ((productos) => {
 console.log ("productos", productos)
 res.send (productos.map((product) => {
  product.dataValues 
 }))   })});


 // Ruta para obtener un solo producto
 router.get(`/:id`, (req, res) => {
  const {id} = req.params
  Product.findByPk (id).then ((product) => {
    if (product) return res.send ("okkkk") 
    if (!product) return res.send ("1")
})
})


module.exports = router;