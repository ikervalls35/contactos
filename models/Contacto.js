const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contacto = sequelize.define('Contacto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    provinciaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'provincias',
            key: 'id'
        }
    }
}, {
    tableName: 'contactos',
    timestamps: true // Genera automáticamente createdAt y updatedAt
});

module.exports = Contacto;