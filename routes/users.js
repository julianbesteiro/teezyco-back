const express = require("express");
const router = express.Router();

const { validateAuth } = require("../middlewares/auth");

const { login, signup, me, logout, updateId, all, deleteId, changeAdmin } = require("../controllers/users");


router.post("/login", login);

router.post("/signup", signup);

router.get("/me", validateAuth, me );

router.post("/logout", logout);

router.put("/update/:id", updateId);

//RUTAS USER ADMIN

router.get("/all", all);

router.delete("/delete/:id",deleteId);

router.put("/changeadmin/:id", changeAdmin );

module.exports = router;
