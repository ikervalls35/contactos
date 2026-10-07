// middlewares/auth.js
function estaAutenticado(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    // Redirige directamente al login sin intentar usar flash
    res.redirect('/login');
}

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