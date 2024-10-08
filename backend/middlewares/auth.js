// middlewares/auth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener token del header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ msg: 'Token no válido.' });
  }
};
