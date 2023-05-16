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

//RUTAS PRODUCTOS DE USER
// Ruta para obtener todos los productos del usuario
router.get('/all', (req, res) => {
  Product.findAll().then((productos) => {
    
    res.send(productos.map((product) => product.dataValues));
  });
});

  // Ruta para obtener un solo producto
  router.get('/products/:id', (req, res) => {
   const {id} = req.params
   Product.findByPk (id).then ((product) => {
     if (product) return res.send (product) 
     if (!product) return res.sendStatus (404)
 })
 })
//RUTAS PRODUCT ADMIN

router.post("/create", (req, res) => {
  console.log('entrar entro');
  const { size, color, model, stock, price, title, description, image } = req.body;
  Product.create({
    size: size,
    color: color,
    model: model,
    stock: stock,
    price: price,
    title: title,
    description: description,
    image: image
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => console.log(error));
});


router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Product.destroy({ where: { id } })
    .then(() => {
      res.status(202).send("Producto eliminado");
    })
    .catch((error) => console.log(error));
});


router.put('/mod/:id', (req,res)=>{
  const { id } = req.params;
  const {size,color,model,stock,price,title,description,image}=req.body

  Product.update({size: size, color: color, model: model, stock: stock, price: price, title: title, description: description, image: image},{where:{id}})
  .then((product) => res.status(200).send(product))
  .catch((error) => console.log(error));
})


module.exports = router;



