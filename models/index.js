const sequelize = require('../config/database'); // Ajusta la ruta a tu config de BD
const User = require('./User');
const Contacto = require('./Contacto');
const Provincia = require('./Provincia');

// Definir relaciones
Provincia.hasMany(Contacto, { foreignKey: 'provinciaId', as: 'contactos' });
Contacto.belongsTo(Provincia, { foreignKey: 'provinciaId', as: 'provincia' });

module.exports = {
    sequelize,
    User,
    Contacto,
    Provincia
};