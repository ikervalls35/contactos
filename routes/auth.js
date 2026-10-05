const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// 1. Mostrar y procesar Registro
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registro);

// 2. Mostrar y procesar Login
router.get('/login', authController.mostrarLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/contactos',
    failureRedirect: '/login',
    failureFlash: false
}));

// 3. Cerrar sesión (Logout)
router.get('/logout', authController.logout);

module.exports = router;