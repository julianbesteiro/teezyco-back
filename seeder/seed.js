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
        
        title: 'Título del producto 10',
        description: 'Descripción del producto 10',
        price: 10.99,
        size: 'S',
        color: 'Verde',
        model: 'Modelo 10',
        stock: 20,
        image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/936/094/products/img-20230215-wa00921-c9f1f775a8ce3c4e3316765665275569-50-0.webp'
          },
        {
          title: 'Los Angeles',
          description: 'Esta remera oversize blanca es un verdadero icono de estilo inspirado en la vibrante ciudad de Los Ángeles. Su diseño moderno y relajado ofrece un look contemporáneo y desenfadado que captura la esencia del estilo urbano californiano.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 1,
          stock: 20,
          image: "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp---https://http2.mlstatic.com/D_NQ_NP_797389-MLA54719240553_032023-O.webp"
        },
        {
          title: 'Dumb Days',
          description: '"Esta remera oversize de "Dumd Days" es una prenda que combina estilo y comodidad en un diseño contemporáneo. Confeccionada con un tejido suave y ligero, te brinda una sensación de máxima comodidad durante todo el día.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 1,
          stock: 20,
          image: "https://http2.mlstatic.com/D_NQ_NP_806683-MLA53857227872_022023-O.webp---https://http2.mlstatic.com/D_NQ_NP_708439-MLA53857274834_022023-O.webp"
        },
        {
          title: 'Oso Teddy',
          description: 'El corte oversize de esta remera proporciona un ajuste amplio y holgado, perfecto para un look relajado y casual. Su longitud extra y sus mangas sueltas añaden un toque de estilo desenfadado y urbano.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 1,
          stock: 20,
          image: "https://http2.mlstatic.com/D_NQ_NP_923458-MLA53456167723_012023-O.webp---https://http2.mlstatic.com/D_NQ_NP_923458-MLA53456167723_012023-O.webp"
        },
        {
          title: 'Adivisori',
          description: 'La remera oversize es una prenda versátil que se puede combinar fácilmente con diferentes estilos. Úsala con unos jeans ajustados y zapatillas para un look casual y urbano, o combínala con una falda y botas para lograr un estilo más vanguardista.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 1,
          stock: 20,
          image:"https://http2.mlstatic.com/D_NQ_NP_840370-MLA69469903853_052023-O.webp---https://http2.mlstatic.com/D_NQ_NP_879631-MLA69470089327_052023-O.webp"
        },
        {
          title: 'Live Your',
          description: 'Sumérgete en la energía de la ciudad con nuestra remera urbana "Live Your". Confeccionada con algodón suave y de alta calidad, esta remera ofrece un ajuste cómodo y un estilo moderno. ',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 2,
          stock: 20,
          image:"https://http2.mlstatic.com/D_NQ_NP_840370-MLA69469903853_052023-O.webp---https://http2.mlstatic.com/D_NQ_NP_879631-MLA69470089327_052023-O.webp"
        },
        {
          title: 'Clasicc',
          description: 'Remera lisa "Urban Chic": Eleva tu estilo urbano con nuestra remera lisa "Urban Chic". Esta remera de diseño sencillo destaca por su sofisticación y versatilidad.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 2,
          stock: 20,
          image:"https://http2.mlstatic.com/D_NQ_NP_749347-MLA47235294745_082021-O.webp---https://http2.mlstatic.com/D_NQ_NP_689294-MLA47235480221_082021-O.webp"
        },
        {
          title: 'Cool',
          description: "Expresa tu estilo auténtico con nuestra remera urbana Fabricada con una mezcla de algodón y poliéster, esta remera ofrece una sensación suave y duradera",
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 2,
          stock: 20,
          image:"https://http2.mlstatic.com/D_NQ_NP_653652-MLA51637622909_092022-O.webp---https://http2.mlstatic.com/D_NQ_NP_618850-MLA51637676610_092022-O.webp"
        },
        {
          title: 'Urban Essential',
          description: 'Nuestra remera básica "Urban Essential" es una pieza imprescindible en cualquier guardarropa urbano. Confeccionada con algodón suave y de alta calidad, esta remera te ofrece comodidad y versatilidad en cada uso.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 2,
          stock: 20,
          image:"https://http2.mlstatic.com/D_NQ_NP_974007-MLA54936114585_042023-O.webp---https://http2.mlstatic.com/D_NQ_NP_969094-MLA54936108985_042023-O.webp"
        },     {
          title: 'GreenLook',
          description: 'Sumérgete en un mundo de ensueño con nuestra remera estética "Dreamy Clouds". Confeccionada con algodón suave y ligero, esta remera te envuelve en una sensación de comodidad y tranquilidad.',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 3,
          stock: 20,
          image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-2591-2e1e9c6b39318d7ccf16834703573047-640-0.webp---https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-21-1dcbf7108cff87d8d116834703574992-640-0.webp"
        },
        {
          title: 'BlackLook',
          description: 'Celebra la belleza de la naturaleza con nuestra remera estética "Floral Delight"',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 3,
          stock: 20,
          image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/05-41-f5adc0c4f3153b373d16831182906637-640-0.webp---https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/05-61-75f7005f642aa9d77116831182908533-640-0.webp"
        },     {
          title: 'PinkyLook',
          description: 'Embárcate en una aventura cósmica con nuestra remera estética "Galactic Adventure"',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 3,
          stock: 20,
          image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-3271-9bad016c87178c24f316834707071070-640-0.webp---https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-3271-9bad016c87178c24f316834707071070-640-0.webp"
        },
        {
          title: 'WhiteLook',
          description: 'Sumérgete en un paraíso de colores pastel con nuestra remera estética ',
          price: 10.99,
          size: 'S',
          color: 'Verde',
          categoryId: 3,
          stock: 20,
          image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/140-11-40ba192d4a5d6fa5b616775073386812-640-0.webp---https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/1391-3ab00a842d73512bcc16775073405150-640-0.webp"
        },

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