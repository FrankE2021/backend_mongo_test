const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Ruta para registro de usuarios
router.post('/register', async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(500).json({ message: 'Ocurrió un error durante el registro' });
  }
});

// Ruta para inicio de sesión de usuarios
router.post('/login', async (req, res) => {
  try {
    // Buscar al usuario por su dirección de correo electrónico
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Enviar una respuesta exitosa si la autenticación fue exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).json({ message: 'Ocurrió un error durante el inicio de sesión' });
  }
});

module.exports = router;
