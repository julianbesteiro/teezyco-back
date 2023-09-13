const asyncHandler = require("express-async-handler");

const { Favorite } = require("../models");

exports.favorites = asyncHandler(async (req, res) => {
  const { id } = req.params;

  Favorite.findAll({
    where: {
      UserId: id,
    },
  })
    .then((favorites) => {
      res.send(favorites);
    })
    .catch(() => {
      res.status(500).send("Error al obtener los favoritos");
    });
});
exports.addFavorite = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  Favorite.findByPk(userId)
    .then((favorite) => {
      if (favorite && !favorite.products.includes(JSON.parse(productId))) {
        favorite.update(
          (favorite.products = [...favorite.products, JSON.parse(productId)])
        );
        return favorite.save();
      } else {
        throw new Error("Favorite not found");
      }
    })
    .then((updatedFavorite) => {
      res.send(updatedFavorite.dataValues);
    })
    .catch(() => {
      res.send("Error al agregar producto al favorito");
    });
});
exports.removeFavorite = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  Favorite.findByPk(userId)
    .then((favorite) => {
      if (favorite) {
        favorite.update(
          (favorite.products = favorite.products.filter(
            (elem) => elem != productId
          ))
        );
        return favorite.save();
      } else {
        throw new Error("Favorite not found");
      }
    })
    .then((updatedFavorite) => {
      res.send(updatedFavorite);
    })
    .catch(() => {
      res.send("Error al eliminar producto del favorito");
    });
});
