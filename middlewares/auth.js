// Middleware para proteger rutas que requieren estar autenticado
function estaAutenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor, inicia sesión para acceder');
    res.redirect('/auth/login');
}

// Middleware opcional para redirigir si ya está autenticado (ej: no mostrar login de nuevo)
function noAutenticado(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return next();
    }
    res.redirect('/contactos');
}

module.exports = {
    estaAutenticado,
    noAutenticado
};