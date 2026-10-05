const { sequelize, Pais, Provincia, Contacto } = require('./models');

async function poblarBaseDeDatos() {
    try {
        // Conectar y sincronizar
        await sequelize.authenticate();
        console.log('✅ Conectado a PostgreSQL para insertar datos...');

        // 1. Crear Países
        const espana = await Pais.create({ nombre: 'España' });
        const argentina = await Pais.create({ nombre: 'Argentina' });

        // 2. Crear Provincias vinculadas a los Países
        const madrid = await Provincia.create({ nombre: 'Madrid', pais_id: espana.id });
        const barcelona = await Provincia.create({ nombre: 'Barcelona', pais_id: espana.id });
        const valencia = await Provincia.create({ nombre: 'Valencia', pais_id: espana.id });
        const buenosAires = await Provincia.create({ nombre: 'Buenos Aires', pais_id: argentina.id });

        // 3. Crear Contactos vinculados a Provincias
        await Contacto.create({
            nombre: 'Juan Pérez',
            telefono: '600123456',
            email: 'juan.perez@example.com',
            provincia_id: madrid.id
        });

        await Contacto.create({
            nombre: 'María García',
            telefono: '611987654',
            email: 'maria.garcia@example.com',
            provincia_id: valencia.id
        });

        console.log('🎉 Datos de prueba insertados con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

poblarBaseDeDatos();