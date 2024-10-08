// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1); // Finaliza el proceso en caso de error
  }
};

module.exports = connectDB;
