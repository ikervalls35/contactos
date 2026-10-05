const express = require('express');
const router = express.Router();
const { Contacto, Provincia, Pais } = require('../models');

// GET: Listar todos los contactos
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

// GET: Formulario para crear contacto
router.get('/crear', async (req, res) => {
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

// POST: Procesar nuevo contacto
router.post('/crear', async (req, res) => {
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

// GET: Formulario para EDITAR contacto (Soporta ambas URLs: /editar/:id y /:id/editar)
router.get(['/editar/:id', '/:id/editar'], async (req, res) => {
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

// POST: Procesar la edición del contacto
router.post(['/editar/:id', '/:id/editar'], async (req, res) => {
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
// POST: Eliminar un contacto
router.post(['/eliminar/:id', '/:id/eliminar'], async (req, res) => {
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