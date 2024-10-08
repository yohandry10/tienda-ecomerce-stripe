const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

// Crear un nuevo pedido
router.post('/', auth, orderController.crearPedido);

// Obtener pedidos del usuario autenticado
router.get('/mispedidos', auth, orderController.obtenerPedidosUsuario);

// Obtener todos los pedidos (solo administradores)
router.get('/', auth, orderController.obtenerTodosLosPedidos);

module.exports = router;
