const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

//todos los favoritos
router.get('/:id', (req, res) => {
  const {id } = req.params;
  
  Favorite.findAll({
    where: {
      UserId: id
    }
  })
    .then((favorites) => {

      res.send(favorites);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error al obtener los favoritos");
    });
});

router.post('/add/:userId', (req, res) => {
  const { userId } = req.params;
  const  {productId}  = req.body;

  Favorite.findByPk(userId)
    .then((favorite) => {

      if (favorite&&!favorite.products.includes(productId)) {
        
        favorite.update(favorite.products = [...favorite.products, productId]);
        return favorite.save();
      } else {
        throw new Error('Favorite not found');
      }
    })
    .then((updatedFavorite) => {
      res.send(updatedFavorite.dataValues);
    })
    .catch((error) => {
      res.send("Error al agregar producto al favorito")
    });
});

// Ruta para eliminar un producto del favorito
router.delete('/remove/:favoriteId/:productId', (req, res) => {
  const { favoriteId, productId } = req.params;

  Favorite.findByPk(favoriteId)
    .then((favorite) => {
      if (favorite) {
        const index = favorite.products.findIndex((product) => product.id === productId);
        if (index !== -1) {
          favorite.products.splice(index, 1);
          return favorite.save();
        } else {
          throw new Error('Product not found in favorite');
        }
      } else {
        throw new Error('Favorite not found');
      }
    })
    .then((updatedFavorite) => {
      console.log('Producto eliminado del favorito:', updatedFavorite);
      res.send(updatedFavorite);
    })
    .catch((error) => {
      console.error('Error al eliminar producto del favorito:', error);
    });
});



module.exports = router;
