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
    .catch(() => {
      
      res.status(500).send("Error al obtener los favoritos");
    });
});
//agregar favorito
router.post('/add/:userId/:productId', (req, res) => {
  const { userId, productId} = req.params;
   
  Favorite.findByPk(userId)
    .then((favorite) => {

      if (favorite&&!favorite.products.includes(JSON.parse(productId) )) {
        
        favorite.update(favorite.products = [...favorite.products, JSON.parse(productId)]);
        return favorite.save();
      } else {
        throw new Error('Favorite not found');
      }
    })
    .then((updatedFavorite) => {
      res.send(updatedFavorite.dataValues);
    })
    .catch(() => {
      res.send("Error al agregar producto al favorito")
    });
});

// Ruta para eliminar un producto del favorito
router.delete('/remove/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;

  Favorite.findByPk(userId)
    .then((favorite) => {
      if (favorite) {
        favorite.update(favorite.products = favorite.products.filter((elem)=>elem!=productId))
        return favorite.save()
      } else {
        throw new Error('Favorite not found');
      }
    })
    .then((updatedFavorite) => {
      res.send(updatedFavorite);
    })
    .catch(() => {
      res.send('Error al eliminar producto del favorito');
    });
});



module.exports = router;
