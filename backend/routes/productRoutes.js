// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// Rutas públicas
router.get('/categories', productController.obtenerCategorias);
router.get('/featured', productController.obtenerProductosDestacados); // Nueva ruta para productos destacados
router.get('/:id', productController.obtenerProductoPorId);
router.get('/', productController.obtenerProductos);

// Rutas protegidas (solo administradores)
router.post('/', auth, admin, productController.crearProducto);
router.put('/:id', auth, admin, productController.actualizarProducto);
router.delete('/:id', auth, admin, productController.eliminarProducto);

module.exports = router;
