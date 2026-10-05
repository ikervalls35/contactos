const { sequelize, Provincia } = require('./models');

const provinciasIniciales = [
    { nombre: 'Alicante' },
    { nombre: 'Castellón' },
    { nombre: 'Valencia' }
];

async function seed() {
    try {
        // Sincroniza la base de datos
        await sequelize.sync();

        // Elimina registros permitiendo borrado en cascada en PostgreSQL
        await Provincia.destroy({ where: {}, cascade: true, truncate: true });

        // Inserta Alicante, Castellón y Valencia
        await Provincia.bulkCreate(provinciasIniciales);
        console.log('✅ Provincias cargadas con éxito: Alicante, Castellón y Valencia');
    } catch (error) {
        console.error('❌ Error al poblar provincias:', error);
    } finally {
        process.exit();
    }
}

seed();