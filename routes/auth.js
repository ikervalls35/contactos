const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// GET: Vista de Login (views/auth/login.ejs)
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// POST: Procesar Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/contactos',
    failureRedirect: '/login'
}));

// GET: Vista de Registro (views/auth/registro.ejs)
router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

// POST: Procesar Registro completo
router.post('/registro', async (req, res) => {
    try {
        const { username, email, telefono, password } = req.body;

        // Validar si el nombre de usuario o email ya existe
        const usuarioExiste = await User.findOne({ where: { username } });
        if (usuarioExiste) {
            return res.render('auth/registro', {
                error: 'El nombre de usuario ya está registrado.'
            });
        }

        // Cifrar la contraseña con bcrypt (10 rondas de sal)
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Guardar en PostgreSQL incluyendo email y teléfono
        await User.create({
            username,
            email,
            telefono,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Error en el registro:', error);
        res.render('auth/registro', {
            error: 'Error al registrar el usuario: ' + error.message
        });
    }
});

// GET: Cerrar Sesión
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

module.exports = router;