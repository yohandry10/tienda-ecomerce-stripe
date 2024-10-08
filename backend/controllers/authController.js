// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Esquema de validación para registro
const esquemaRegistro = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Esquema de validación para inicio de sesión
const esquemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.registrarUsuario = async (req, res) => {
  try {
    // Validar datos
    const { error } = esquemaRegistro.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El correo electrónico ya está en uso.' });
    }

    // Crear nuevo usuario
    usuario = new User({ name, email, role: 'usuario' });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    await usuario.save();

    // Crear y asignar token
    const payload = { userId: usuario._id, role: usuario.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: payload });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).send('Error en el servidor.');
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    // Validar datos
    const { error } = esquemaLogin.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }

    // Verificar contraseña
    const esPasswordValida = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValida) {
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }

    // Crear y asignar token
    const payload = { userId: usuario._id, role: usuario.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: payload });
  } catch (error) {
    console.error('Error en iniciarSesion:', error);
    res.status(500).send('Error en el servidor.');
  }
};
