const express = require('express');
const router = express.Router();

const contactoController = require('../controllers/contactoController');
const authController = require('../controllers/authController');
const { estaAutenticado } = require('../middlewares/auth');
const { validarContacto } = require('../middlewares/validator');

// Rutas de Autenticación
router.get('/login', authController.mostrarLogin);
router.post('/login', authController.login);
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registro);
router.get('/logout', authController.logout);

// Rutas de Contactos (Protegidas)
router.get('/', (req, res) => res.redirect('/contactos'));
router.get('/contactos', estaAutenticado, contactoController.listar);
router.get('/contactos/nuevo', estaAutenticado, contactoController.mostrarFormularioCrear);
router.post('/contactos', estaAutenticado, validarContacto, contactoController.crear);
router.get('/contacto/:id', estaAutenticado, contactoController.mostrarFormularioEditar);
router.post('/contacto/:id', estaAutenticado, contactoController.procesarAccion);

module.exports = router;
