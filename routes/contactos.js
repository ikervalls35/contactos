const express = require('express');
const router = express.Router();
const { Contacto, Provincia, Pais } = require('../models');

// Importar middleware de autenticación
const { estaAutenticado } = require('../middlewares/auth'); // Ajusta la ruta a tu archivo auth.js si es necesario

// GET: Listar todos los contactos (ACCESO PÚBLICO)
router.get('/', async (req, res) => {
    try {
        const contactos = await Contacto.findAll({
            include: [{
                model: Provincia,
                as: 'provincia',
                include: [{ model: Pais, as: 'pais' }]
            }],
            order: [['id', 'ASC']]
        });
        res.render('contactos/index', { contactos });
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).send('Error al cargar contactos');
    }
});

// GET: Formulario para crear contacto (PROTEGIDO)
router.get('/crear', estaAutenticado, async (req, res) => {
    try {
        const provincias = await Provincia.findAll({
            include: [{ model: Pais, as: 'pais' }],
            order: [['nombre', 'ASC']]
        });
        res.render('contactos/crear', { provincias });
    } catch (error) {
        console.error('Error al cargar formulario de creación:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Procesar nuevo contacto (PROTEGIDO)
router.post('/crear', estaAutenticado, async (req, res) => {
    try {
        const { nombre, telefono, email, provincia_id } = req.body;
        await Contacto.create({
            nombre,
            telefono,
            email,
            provincia_id: provincia_id ? parseInt(provincia_id, 10) : null
        });
        res.redirect('/contactos');
    } catch (error) {
        console.error('Error al crear contacto:', error);
        res.status(500).send('Error al guardar contacto');
    }
});

// GET: Formulario para EDITAR / VER contacto (PROTEGIDO)
// Si un usuario no logueado hace clic en "Solo lectura", entra aquí y el middleware lo redirige a /auth/login
router.get(['/editar/:id', '/:id/editar'], estaAutenticado, async (req, res) => {
    try {
        const contacto = await Contacto.findByPk(req.params.id, {
            include: [{
                model: Provincia,
                as: 'provincia',
                include: [{ model: Pais, as: 'pais' }]
            }]
        });

        if (!contacto) {
            return res.status(404).send('Contacto no encontrado');
        }

        const provincias = await Provincia.findAll({
            include: [{ model: Pais, as: 'pais' }],
            order: [['nombre', 'ASC']]
        });

        res.render('contactos/editar', { contacto, provincias });
    } catch (error) {
        console.error('Error al cargar formulario de edición:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Procesar la edición del contacto (PROTEGIDO)
router.post(['/editar/:id', '/:id/editar'], estaAutenticado, async (req, res) => {
    try {
        const { nombre, telefono, email, provincia_id } = req.body;

        await Contacto.update(
            {
                nombre,
                telefono,
                email,
                provincia_id: provincia_id ? parseInt(provincia_id) : null
            },
            { where: { id: req.params.id } }
        );

        res.redirect('/contactos');
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.status(500).send('Error al guardar cambios');
    }
});

// POST: Eliminar un contacto (PROTEGIDO)
router.post(['/eliminar/:id', '/:id/eliminar'], estaAutenticado, async (req, res) => {
    try {
        await Contacto.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/contactos');
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        res.status(500).send('Error al eliminar el contacto');
    }
});

module.exports = router;