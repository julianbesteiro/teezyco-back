const express = require("express");
const router = express.Router();
const { favorites, addFavorite, removeFavorite } = require("../controllers/favorite");

//todos los favoritos
router.get('/:id', favorites );
//agregar favorito
router.post('/add/:userId/:productId', addFavorite );

// Ruta para eliminar un producto del favorito
router.delete('/remove/:userId/:productId', removeFavorite);



module.exports = router;
