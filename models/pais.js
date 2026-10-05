const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pais = sequelize.define('Pais', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'paises',
        timestamps: false
    });

    Pais.associate = (models) => {
        Pais.hasMany(models.Provincia, {
            foreignKey: 'pais_id',
            as: 'provincias'
        });
    };

    return Pais;
};