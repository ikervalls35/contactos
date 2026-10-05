const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

if (!sequelize) {
    throw new Error("No se pudo importar la instancia de Sequelize. Revisa config/database.js");
}

// 1. Cargar todos los modelos
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
    .forEach(file => {
        const modelModule = require(path.join(__dirname, file));

        const model = typeof modelModule === 'function'
            ? modelModule(sequelize, Sequelize.DataTypes)
            : modelModule;

        if (model && model.name) {
            db[model.name] = model;
        }
    });

// 2. Ejecutar asociaciones pasando el objeto db
Object.keys(db).forEach(modelName => {
    if (typeof db[modelName].associate === 'function') {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;