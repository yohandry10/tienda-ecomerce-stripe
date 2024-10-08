// controllers/productController.js

const Product = require('../models/Product');
const Joi = require('joi');
const { getExchangeRate } = require('../utils/exchangeRate');

// Esquema de validación para productos
const schemaProducto = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().allow(''),
  precio: Joi.number().required(),
  moneda: Joi.string().required(),
  categoria: Joi.string().required(),
  stock: Joi.number().integer().required(),
  imagen: Joi.string().uri().allow(''),
  destacado: Joi.boolean().default(false), // Añadir campo "destacado"
});

// Obtener todos los productos con opción de conversión de moneda
exports.obtenerProductos = async (req, res) => {
  try {
    const { moneda } = req.query;
    const productos = await Product.find();

    if (productos.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron productos en la base de datos.' });
    }

    if (moneda && moneda.toUpperCase() !== 'USD') {
      const rate = await getExchangeRate('USD', moneda.toUpperCase());
      const productosConvertidos = productos.map((producto) => {
        return {
          ...producto._doc,
          precio: (producto.precio * rate).toFixed(2),
          moneda: moneda.toUpperCase(),
        };
      });
      res.json(productosConvertidos);
    } else {
      res.json(productos);
    }
  } catch (error) {
    console.error('Error en obtenerProductos:', error.message);
    res.status(500).json({ msg: 'Error al obtener productos del servidor.' });
  }
};

// Obtener productos destacados
exports.obtenerProductosDestacados = async (req, res) => {
  try {
    const productosDestacados = await Product.find({ destacado: true }).limit(8);
    res.json(productosDestacados);
  } catch (error) {
    console.error('Error en obtenerProductosDestacados:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado.' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error en obtenerProductoPorId:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Obtener categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Product.distinct('categoria');
    res.json(categorias);
  } catch (error) {
    console.error('Error en obtenerCategorias:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    // Validar datos
    const { error } = schemaProducto.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error en crearProducto:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
  try {
    // Validar datos
    const { error } = schemaProducto.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { id } = req.params;
    const productoActualizado = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!productoActualizado) {
      return res.status(404).json({ msg: 'Producto no encontrado.' });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    res.status(500).send('Error en el servidor.');
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ msg: 'Producto no encontrado.' });
    }

    res.json({ msg: 'Producto eliminado.' });
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    res.status(500).send('Error en el servidor.');
  }
};
