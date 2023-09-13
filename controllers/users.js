const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/tokens");
const { User } = require("../models");
const Favorite = require("../models/Favorite");
const Cart = require("../models/Cart");

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        id: user.id,
        admin: user.admin,
      };

      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
})
exports.signup = asyncHandler(async (req, res) => {
  User.create(req.body)
    .then((user) => {
      Favorite.create({ id: user.id })
        .then((favorite) => {
          user.setFavorite(favorite);
        })
        .then(() => {
          Cart.create()
            .then((cart) => cart.setCartOwner(user))
            .then(() => res.send("Usuario creado con su carrito y favorito"));
        });
    })
    .catch((error) => {
      console.log(error);
    });
})
exports.me = asyncHandler(async (req, res) => {
  res.send(req.user);
})
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
})
exports.updateId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.update(req.body, { where: { id } })
    .then(() => res.status(200).send("Datos de usuario actualizados"))
    .catch((error) => console.log(error));
})
exports.all = asyncHandler(async (req, res) => {
  User.findAll({ order: [["id", "ASC"]] }).then((users) => {
    res.send(users.map((user) => user.dataValues));
  });
})
exports.deleteId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    deleteId
    User.destroy({ where: { id } })
      .then((user) => {
        res.status(202).send("Usuario eliminado");
      })
      .catch((error) => console.log(error));
  })
exports.changeAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.findOne({ where: { id } })
    .then((user) => {
      const status = !user.admin;

      User.update({ admin: status }, { where: { id } });
    })
    .then(() => res.status(200).send("Usuario actualizado"))
    .catch((error) => console.log(error));
})