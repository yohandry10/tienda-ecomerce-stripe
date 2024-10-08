// middlewares/admin.js

module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'administrador') {
    next();
  } else {
    return res.status(403).json({ msg: 'Acceso denegado: Se requiere rol de administrador.' });
  }
};
