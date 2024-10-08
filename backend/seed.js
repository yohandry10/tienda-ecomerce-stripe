const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config(); // Agrega esta línea para leer las variables del archivo .env

// Conectar a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Datos de ejemplo para insertar en la base de datos
const productos = [
  {
    nombre: 'Producto 1',
    descripcion: 'Descripción del Producto 1',
    precio: 10.99,
    moneda: 'USD',
    categoria: 'Electrónica',
    stock: 50,
    imagen: 'https://via.placeholder.com/150',
  },
  {
    nombre: 'Producto 2',
    descripcion: 'Descripción del Producto 2',
    precio: 20.99,
    moneda: 'USD',
    categoria: 'Hogar',
    stock: 30,
    imagen: 'https://via.placeholder.com/150',
  },
  {
    nombre: 'Producto 3',
    descripcion: 'Descripción del Producto 3',
    precio: 15.99,
    moneda: 'USD',
    categoria: 'Moda',
    stock: 100,
    imagen: 'https://via.placeholder.com/150',
  },
];

// Insertar productos en la base de datos
Product.insertMany(productos)
  .then(() => {
    console.log('Productos agregados exitosamente');
    mongoose.connection.close(); // Cerrar conexión a MongoDB
  })
  .catch((error) => {
    console.error('Error al agregar productos:', error);
    mongoose.connection.close(); // Cerrar conexión a MongoDB
  });
