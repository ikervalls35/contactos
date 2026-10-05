const { body, validationResult } = require('express-validator');

// Reglas de validación para contactos
const validarContacto = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('telefono')
        .trim()
        .notEmpty()
        .withMessage('El teléfono es obligatorio'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Debe ser un email válido'),

    body('provinciaId')
        .notEmpty()
        .withMessage('Debes seleccionar una provincia'),

    // Middleware para verificar si existen errores en la petición
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            req.flash('errores', errores.array());
            return res.redirect('back');
        }
        next();
    }
];

module.exports = {
    validarContacto
};