const { User } = require('../models');

// Mostrar formulario de Registro
exports.mostrarRegistro = (req, res) => {
    res.render('auth/registro', { error: null });
};

// Procesar Registro con Validaciones
exports.registro = async (req, res) => {
    try {
        const { username, email, telefono, password } = req.body;

        // 1. Verificar campos obligatorios
        if (!username || !email || !telefono || !password) {
            return res.render('auth/registro', { error: 'Todos los campos son obligatorios.' });
        }

        // 2. Validar formato de correo electrónico (@)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.render('auth/registro', { error: 'Por favor, introduce un correo electrónico válido.' });
        }

        // 3. Validar longitud mínima de contraseña (6 caracteres)
        if (password.length < 6) {
            return res.render('auth/registro', { error: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        // 4. Crear el usuario en la base de datos
        await User.create({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            telefono: telefono.trim(),
            password: password
        });

        console.log('✅ Usuario registrado exitosamente:', username);
        return res.redirect('/login');

    } catch (error) {
        console.error('❌ Error en el registro:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.render('auth/registro', { error: 'El nombre de usuario o correo ya está registrado.' });
        }

        return res.render('auth/registro', { error: 'Ocurrió un error al procesar el registro.' });
    }
};

// --- AÑADIR LAS FUNCIONES QUE FALTABAN ---

// Mostrar formulario de Login
exports.mostrarLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

// Cerrar sesión (Logout)
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/login');
        });
    });
};