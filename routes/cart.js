const express = require("express");
const router = express.Router();

const { verCarrito, agregarAlCarrito, eliminarDelCarrito } = require("../controllers/cart");

//CARRITO SE CREA CON SIGN UP

//RUTA GET PARA VER PRODUCTOS DE CARRITO
router.get("/:cartId", verCarrito);

//AGREGAR UN PRODUCTO AL CARRITO
router.post("/add/:cartId/:productId", agregarAlCarrito );

//ELIMINAR PRODUCTO DE CARRITO

router.put("/delete/:cartId/:productId", eliminarDelCarrito );

module.exports = router;
