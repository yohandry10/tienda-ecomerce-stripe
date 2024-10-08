
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createUser = async ({ nombre, email, password }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ nombre, email, password: hashedPassword });
    await newUser.save();
    const payload = { userId: newUser._id, rol: newUser.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { token, user: newUser };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');
    const payload = { userId: user._id, rol: user.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { token, user };
};
