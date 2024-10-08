const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productos: [
      {
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        cantidad: { type: Number, required: true },
      },
    ],
    direccionEnvio: {
      direccion: { type: String, required: true },
      ciudad: { type: String, required: true },
      estado: { type: String, required: true }, // Nuevo campo para el estado
      codigoPostal: { type: String, required: true },
      pais: { type: String, required: true },
    },
    metodoPago: { type: String, required: true },
    precioItems: { type: Number, required: true },
    precioImpuesto: { type: Number, required: true },
    precioEnvio: { type: Number, required: true },
    precioTotal: { type: Number, required: true },
    moneda: { type: String, required: true, default: 'USD' }, // Nuevo campo para la moneda
    estaPagado: { type: Boolean, required: true, default: false },
    fechaPago: { type: Date },
    estaEntregado: { type: Boolean, required: true, default: false },
    fechaEntrega: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
