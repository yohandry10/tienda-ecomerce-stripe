const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Joi = require('joi');
const { getExchangeRate } = require('../utils/exchangeRate');

// Esquema de validación para pedidos
const schemaPedido = Joi.object({
  productos: Joi.array()
    .items(
      Joi.object({
        producto: Joi.string().required(),
        cantidad: Joi.number().integer().required(),
      })
    )
    .required(),
  direccionEnvio: Joi.object({
    direccion: Joi.string().required(),
    ciudad: Joi.string().required(),
    estado: Joi.string().required(), // Nuevo campo
    codigoPostal: Joi.string().required(),
    pais: Joi.string().required(),
  }).required(),
  metodoPago: Joi.string().required(),
  precioItems: Joi.number().required(),
  precioImpuesto: Joi.number().required(),
  precioEnvio: Joi.number().required(),
  precioTotal: Joi.number().required(),
  moneda: Joi.string().required(),
});

exports.crearPedido = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Validar datos
    const { error } = schemaPedido.validate(req.body);
    if (error) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ msg: error.details[0].message });
    }

    const {
      productos,
      direccionEnvio,
      metodoPago,
      precioItems,
      precioImpuesto,
      precioEnvio,
      precioTotal,
      moneda,
    } = req.body;

    // Convertir precios a USD si es necesario
    let rate = 1;
    if (moneda !== 'USD') {
      rate = await getExchangeRate(moneda, 'USD');
    } 
    const precioItemsUSD = precioItems * rate;
    const precioImpuestoUSD = precioImpuesto * rate;
    const precioEnvioUSD = precioEnvio * rate;
    const precioTotalUSD = precioTotal * rate;

    // Verificar stock y actualizar cantidades
    for (let item of productos) {
      const producto = await Product.findById(item.producto).session(session);
      if (!producto) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ msg: `Producto no encontrado: ${item.producto}` });
      }
      if (producto.stock < item.cantidad) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });
      }
      producto.stock -= item.cantidad;
      await producto.save({ session });
    }

    // Crear nuevo pedido
    const nuevoPedido = new Order({
      usuario: req.user.userId,
      productos,
      direccionEnvio,
      metodoPago,
      precioItems: precioItemsUSD,
      precioImpuesto: precioImpuestoUSD,
      precioEnvio: precioEnvioUSD,
      precioTotal: precioTotalUSD,
      moneda: 'USD',
    });

    await nuevoPedido.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(nuevoPedido);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error en crearPedido:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Obtener pedidos del usuario autenticado
exports.obtenerPedidosUsuario = async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.user.userId }).populate('productos.producto');
    res.json(pedidos);
  } catch (error) {
    console.error('Error en obtenerPedidosUsuario:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Obtener todos los pedidos (solo administradores)
exports.obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find()
      .populate('usuario')
      .populate('productos.producto');
    res.json(pedidos);
  } catch (error) {
    console.error('Error en obtenerTodosLosPedidos:', error);
    res.status(500).send('Error en el servidor.');
  }
};
