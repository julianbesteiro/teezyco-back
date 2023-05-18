//ejecutar en la terminal:  node seeder/seed.js

const { Product } = require('../models');
const { User } = require('../models');
const sequelize = require('sequelize'); 
const bcrypt = require('bcrypt')

// Función asincrónica para sembrar los datos de productos
async function seedProducts() {
  try {
    
    const products = [
      {
        name: 'Producto 1',
        title: 'Título del producto 1',
        description: 'Descripción del producto 1',
        price: 10.99,
        size: 'M',
        color: 'Rojo',
        model: 'Modelo 1',
        stock: 50,
        image: 'imagen1.jpg'
      },
      {
        name: 'Producto 2',
        title: 'Título del producto 2',
        description: 'Descripción del producto 2',
        price: 19.99,
        size: 'L',
        color: 'Azul',
        model: 'Modelo 2',
        stock: 30,
        image: 'imagen2.jpg'
      },
      {
        name: 'Producto 3',
        title: 'Título del producto 3',
        description: 'Descripción del producto 3',
        price: 5.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 3',
        stock: 20,
        image: 'imagen3.jpg'
      }
    ];

    // Crear y guardar los productos en la base de datos
    await Product.bulkCreate(products);

    console.log('Productos sembrados exitosamente');
  } catch (error) {
    console.error('Error al sembrar los datos de productos:', error);
  } 
}

// Llamar a la función de sembrado de productos
seedProducts();