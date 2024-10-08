// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    moneda: { type: String, required: true, default: 'USD' },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
