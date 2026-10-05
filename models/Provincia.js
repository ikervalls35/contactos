const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provincia = sequelize.define('Provincia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'provincias',
    timestamps: false // Si no usas campos createdAt/updatedAt en esta tabla
});

module.exports = Provincia;