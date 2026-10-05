const express = require('express');
const router = express.Router();

const contactoController = require('../controllers/contactoController');
const authController = require('../controllers/authController');
const { estaAutenticado } = require('../middlewares/auth');
const { validarContacto } = require('../middlewares/validator');

// Rutas de Autenticación
router.get('/auth/login', authController.mostrarLogin);
router.post('/auth/login', authController.login);
router.get('/auth/registro', authController.mostrarRegistro);
router.post('/auth/registro', authController.registro);
router.get('/auth/logout', authController.logout);

// Rutas de Contactos (Protegidas)
router.get('/', (req, res) => res.redirect('/contactos'));
router.get('/contactos', estaAutenticado, contactoController.listar);
router.get('/contactos/nuevo', estaAutenticado, contactoController.mostrarFormularioCrear);
router.post('/contactos', estaAutenticado, validarContacto, contactoController.crear);
router.get('/contacto/:id', estaAutenticado, contactoController.mostrarFormularioEditar);
router.post('/contacto/:id', estaAutenticado, contactoController.procesarAccion);

module.exports = router;