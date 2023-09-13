const express = require("express");
const router = express.Router();

const { categories, createCategories, deleteCategories, modCategories } = require("../controllers/categories");

// Ruta para obtener todos los productos del usuario
router.get("/all", categories);

//RUTAS CATEGORIES ADMIN

router.post("/create",createCategories );

router.delete("/delete/:id", deleteCategories );

router.put("/mod/:id", modCategories);

module.exports = router;
