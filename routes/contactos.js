const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactoController');

function soloAutenticados(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Pública
router.get('/', contactosController.listar);

// Protegidas
router.get('/crear', soloAutenticados, contactosController.mostrarFormularioCrear);
router.post('/crear', soloAutenticados, contactosController.crear);
router.get('/:id/editar', soloAutenticados, contactosController.mostrarFormularioEditar);
router.post('/:id', soloAutenticados, contactosController.procesarAccion);

module.exports = router;