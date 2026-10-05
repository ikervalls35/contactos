const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // O tu instancia de Sequelize

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users' // Asegura el nombre exacto de la tabla en PostgreSQL
});

module.exports = User;