//ejecutar en la terminal:  node seeder/seed.js

const { Product } = require('../models');
const { User } = require('../models');
const sequelize = require('sequelize'); 
const bcrypt = require('bcrypt')

// Crear una función asincrónica para sembrar los datos
async function seedData() {
  try {
    
    
    const users = [
      { name: 'Usuario 1', email: 'usuario1@example.com', lastName: 'blall', password: '1234' },
      { name: 'Usuario 2', email: 'usuario2@example.com', lastName: 'blalqfl', password: '1234' },
      { name: 'Usuario 3', email: 'usuario3@example.com', lastName: 'bladvll', password: '1234' }
    ];

    // Hashear las contraseñas antes de guardar los usuarios
    
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = bcrypt.genSaltSync(8);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
          salt: salt
        };
      })
      );

      // Crear y guardar los usuarios en la base de datos
      await User.bulkCreate(hashedUsers);
      
    console.log('Datos sembrados exitosamente');
  } catch (error) {
    console.error('Error al sembrar los datos:', error);
  }
}

// Llamar a la función de sembrado
seedData();


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
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img_10971-3ea34e3aca9d6d315a16806246991848-1024-1024.webp'
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
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img-20230215-wa00871-0befee5df3edfb681a16765668983841-1024-1024.webp'
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
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/image-21-9116dca132045323eb16813059713938-1024-1024.webp'
      },
      {
        name: 'Producto 4',
        title: 'Título del producto 4',
        description: 'Descripción del producto 4',
        price: 6.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 4',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/image-191-f0af036d61ac0f085016823700433871-1024-1024.webp'
      },
      {
        name: 'Producto 5',
        title: 'Título del producto 5',
        description: 'Descripción del producto 5',
        price: 7.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 5',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/image-41-b64dec0fa0e7861be416813064271476-1024-1024.webp'
        },
        {
        name: 'Producto 6',
        title: 'Título del producto 6',
        description: 'Descripción del producto 6',
        price: 7.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 6',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img-20220921-wa0064-11-8ef45dba06e4316c9a16802969274229-1024-1024.webp'
          },
          {
        name: 'Producto 7',
        title: 'Título del producto 7',
        description: 'Descripción del producto 37',
        price: 8.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 7',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/image-141-f37a6d05246a5b9aba16823697037095-50-0.webp'
          },
          {
        name: 'Producto 8',
        title: 'Título del producto 8',
        description: 'Descripción del producto 8',
        price: 8.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 8',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img_11131-b1abe52dfb4c47852716802964442455-50-0.webp'
          },
          {
        name: 'Producto 9',
        title: 'Título del producto 9',
        description: 'Descripción del producto 9',
        price: 9.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 9',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img-20230303-wa00271-ef8c5b9fab8d93b8d516779435047422-50-0.webp'
          },
          {
        name: 'Producto 10',
        title: 'Título del producto 10',
        description: 'Descripción del producto 10',
        price: 10.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 10',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img-20230215-wa00921-c9f1f775a8ce3c4e3316765665275569-50-0.webp'
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