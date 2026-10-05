const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.get('/', contactoController.getAllContactos);
router.get('/nuevo', contactoController.renderCreateForm);
router.post('/', contactoController.createContacto);

module.exports = router;