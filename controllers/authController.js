const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Mostrar formulario de login
exports.mostrarLogin = (req, res) => {
    res.render('auth/login', { error: req.flash('error') });
};

// Procesar el login
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/contactos',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

// Mostrar formulario de registro
exports.mostrarRegistro = (req, res) => {
    res.render('auth/registro', { error: req.flash('error') });
};

// Procesar el registro de un nuevo usuario
exports.registro = async (req, res) => {
    try {
        console.log('--- DATOS RECIBIDOS EN REGISTRO ---', req.body);

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log('✅ Usuario creado correctamente en BD:', nuevoUsuario.toJSON());
        res.redirect('/auth/login');
    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        req.flash('error', 'Error al crear el usuario.');
        res.redirect('/auth/registro');
    }
};

// Cerrar sesión
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/auth/login');
    });
};