const express = require("express");
const router = express.Router();

const { obtenerFavorites, obtenerUnFavorite, createFavorite, deleteFavorite, modFavorite, searchFavorite } = require("../controllers/products");

// Ruta para obtener todos los productos del usuario
router.get("/all", obtenerFavorites);

// Ruta para obtener un solo producto
router.get(`/:id`, obtenerUnFavorite);

//RUTAS PRODUCT ADMIN

router.post("/create", createFavorite);

router.delete("/delete/:id",deleteFavorite );

router.put("/mod/:id",modFavorite);

//RUTA BUSCADOR

router.get("/search/:term", searchFavorite);

module.exports = router;
