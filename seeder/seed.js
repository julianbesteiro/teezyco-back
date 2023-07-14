//ejecutar en la terminal:  node seeder/seed.js

const { Product } = require("../models");
const { User } = require("../models");
const { Category } = require("../models");

const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

// Función asincrónica para sembrar los datos de productos
async function seedProducts() {
  try {
    const products = [
      {
        title: "los angeles oversize",
        description:
          "Esta remera oversize blanca es un verdadero icono de estilo inspirado en la vibrante ciudad de Los Ángeles. Su diseño moderno y relajado ofrece un look contemporáneo y desenfadado que captura la esencia del estilo urbano californiano.",
        price: 11900,
        size: "One-size",
        color: "White",
        categoryId: 2,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp",
      },
      {
        title: "dumb days oversize",
        description:
          'Esta remera oversize de "Dumd Days" es una prenda que combina estilo y comodidad en un diseño contemporáneo. Confeccionada con un tejido suave y ligero, te brinda una sensación de máxima comodidad durante todo el día.',
        price: 11900,
        size: "One-size",
        color: "White",
        categoryId: 2,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_806683-MLA53857227872_022023-O.webp",
      },
      {
        title: "oso teddy oversize",
        description:
          "El corte oversize de esta remera proporciona un ajuste amplio y holgado, perfecto para un look relajado y casual. Su longitud extra y sus mangas sueltas añaden un toque de estilo desenfadado y urbano.",
        price: 11900,
        size: "One-size",
        color: "White",
        categoryId: 2,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_923458-MLA53456167723_012023-O.webp",
      },
      {
        title: "adivisori oversize",
        description:
          "La remera oversize es una prenda versátil que se puede combinar fácilmente con diferentes estilos. Úsala con unos jeans ajustados y zapatillas para un look casual y urbano, o combínala con una falda y botas para lograr un estilo más vanguardista.",
        price: 11900,
        size: "One-size",
        color: "Black",
        categoryId: 2,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_840370-MLA69469903853_052023-O.webp",
      },
      {
        title: "live your style urban",
        description:
          'Sumérgete en la energía de la ciudad con nuestra remera urbana "Live Your". Confeccionada con algodón suave y de alta calidad, esta remera ofrece un ajuste cómodo y un estilo moderno. ',
        price: 9900,
        size: "One-size",
        color: "Black",
        categoryId: 3,
        stock: 20,
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/879/723/products/a22ba22b-084f-4faa-92e8-b9bb50a6ef561-061a55b268cd2b6a6c16799542761012-1024-1024.webp",
      },
      {
        title: "classic urban",
        description:
          'Remera lisa "Urban Chic": Eleva tu estilo urbano con nuestra remera lisa "Urban Chic". Esta remera de diseño sencillo destaca por su sofisticación y versatilidad.',
        price: 9900,
        size: "One-size",
        color: "Black",
        categoryId: 3,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_749347-MLA47235294745_082021-O.webp",
      },
      {
        title: "cool urban",
        description:
          "Expresa tu estilo auténtico con nuestra remera urbana Fabricada con una mezcla de algodón y poliéster, esta remera ofrece una sensación suave y duradera",
        price: 9900,
        size: "One-size",
        color: "White",
        categoryId: 3,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_653652-MLA51637622909_092022-O.webp",
      },
      {
        title: "urban essential",
        description:
          'Nuestra remera básica "Urban Essential" es una pieza imprescindible en cualquier guardarropa urbano. Confeccionada con algodón suave y de alta calidad, esta remera te ofrece comodidad y versatilidad en cada uso.',
        price: 9900,
        size: "One-size",
        color: "White",
        categoryId: 3,
        stock: 20,
        image:
          "https://http2.mlstatic.com/D_NQ_NP_974007-MLA54936114585_042023-O.webp",
      },
      {
        title: "greenlook aesthetic",
        description:
          'Sumérgete en un mundo de ensueño con nuestra remera estética "Dreamy Clouds". Confeccionada con algodón suave y ligero, esta remera te envuelve en una sensación de comodidad y tranquilidad.',
        price: 10900,
        size: "One-size",
        color: "Green",
        categoryId: 1,
        stock: 20,
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-2591-2e1e9c6b39318d7ccf16834703573047-640-0.webp",
      },
      {
        title: "blacklook aesthetic",
        description:
          'Celebra la belleza de la naturaleza con nuestra remera estética "Floral Delight"',
        price: 10900,
        size: "One-size",
        color: "Black",
        categoryId: 1,
        stock: 20,
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/05-41-f5adc0c4f3153b373d16831182906637-640-0.webp",
      },
      {
        title: "pinkylook aesthetic",
        description:
          'Embárcate en una aventura cósmica con nuestra remera estética "Galactic Adventure"',
        price: 10900,
        size: "One-size",
        color: "Pink",
        categoryId: 1,
        stock: 20,
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-3271-9bad016c87178c24f316834707071070-640-0.webp",
      },
      {
        title: "whitelook aesthetic",
        description:
          "Sumérgete en un paraíso de colores pastel con nuestra remera estética ",
        price: 10900,
        size: "One-size",
        color: "White",
        categoryId: 1,
        stock: 20,
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/140-11-40ba192d4a5d6fa5b616775073386812-640-0.webp",
      },
    ];

    // Crear y guardar los productos en la base de datos
    await Product.bulkCreate(products);

    console.log("Productos sembrados exitosamente");
  } catch (error) {
    console.error("Error al sembrar los datos de productos:", error);
  }
}

async function seedCategories() {
  try {
    const categories = [
      {
        title: "Aesthetic",
        image:
          "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/j-2591-2e1e9c6b39318d7ccf16834703573047-640-0.webp",
      },

      {
        title: "Oversize",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp",
      },

      {
        title: "Urban",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_974007-MLA54936114585_042023-O.webp",
      },
    ];

    // Crear y guardar las cateogrias en la base de datos
    await Category.bulkCreate(categories);

    console.log("Categorias sembradas exitosamente");
  } catch (error) {
    console.error("Error al sembrar los datos de categorias:", error);
  }
}

// Llamar a la función de sembrado de productos, de categorias y de usuarios
seedProducts();

seedCategories();
