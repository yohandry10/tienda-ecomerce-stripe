// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

router.post('/', auth, paymentController.procesarPago);

module.exports = router;
