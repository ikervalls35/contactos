const { Contacto, Provincia } = require('../models');

// Listar contactos
exports.listar = async (req, res) => {
    try {
        const contactos = await Contacto.findAll({
            include: [{
                model: Provincia,
                as: 'provincia',
                attributes: ['id', 'nombre'] // Ignora createdAt/updatedAt
            }],
            order: [['id', 'ASC']]
        });
        res.render('contactos/index', { contactos });
    } catch (error) {
        console.error('❌ Error exacto al listar contactos:', error);
        res.status(500).send('Error al obtener los contactos: ' + error.message);
    }
};

// Formulario de creación
exports.mostrarFormularioCrear = async (req, res) => {
    try {
        const provincias = await Provincia.findAll({
            attributes: ['id', 'nombre'],
            order: [['nombre', 'ASC']]
        });
        res.render('contactos/crear', { provincias, contacto: {} });
    } catch (error) {
        console.error('❌ Error al cargar formulario de creación:', error);
        res.status(500).send('Error al cargar formulario: ' + error.message);
    }
};

// Crear contacto
exports.crear = async (req, res) => {
    try {
        const { nombre, telefono, email, provinciaId } = req.body;
        await Contacto.create({
            nombre,
            telefono,
            email,
            provinciaId: provinciaId ? parseInt(provinciaId) : null
        });
        res.redirect('/contactos');
    } catch (error) {
        console.error('❌ Error al guardar el contacto:', error);
        res.status(500).send('Error al guardar contacto: ' + error.message);
    }
};

// Ver / Editar contacto
exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const contacto = await Contacto.findByPk(req.params.id);
        if (!contacto) return res.status(404).send('Contacto no encontrado');

        const provincias = await Provincia.findAll({
            attributes: ['id', 'nombre'],
            order: [['nombre', 'ASC']]
        });
        res.render('contactos/editar', { contacto, provincias });
    } catch (error) {
        console.error('❌ Error al cargar el contacto para editar:', error);
        res.status(500).send('Error al cargar el contacto: ' + error.message);
    }
};

// Actualizar o Eliminar (según botón presionado)
exports.procesarAccion = async (req, res) => {
    const { id } = req.params;
    const { accion, nombre, telefono, email, provinciaId } = req.body;

    try {
        if (accion === 'eliminar') {
            await Contacto.destroy({ where: { id } });
        } else {
            await Contacto.update(
                {
                    nombre,
                    telefono,
                    email,
                    provinciaId: provinciaId ? parseInt(provinciaId) : null
                },
                { where: { id } }
            );
        }
        res.redirect('/contactos');
    } catch (error) {
        console.error('❌ Error al procesar acción (editar/eliminar):', error);
        res.status(500).send('Error al procesar la acción: ' + error.message);
    }
};