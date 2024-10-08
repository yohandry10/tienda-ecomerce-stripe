const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const auth = require('../middlewares/auth');

router.post('/rates', auth, shippingController.obtenerTarifasEnvio);

module.exports = router;
