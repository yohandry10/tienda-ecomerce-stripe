require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('dev'));

// Limitador de tasa
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 solicitudes por IP
});

app.use('/api', apiLimiter);

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Verifica que estas rutas no se superpongan
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de la Tienda Online!');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(500).json({ msg: 'Error en el servidor.' });
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
