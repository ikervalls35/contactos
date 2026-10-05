const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Provincia = sequelize.define('Provincia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'paises',
                key: 'id'
            }
        }
    }, {
        tableName: 'provincias',
        timestamps: false
    });

    Provincia.associate = (models) => {
        Provincia.belongsTo(models.Pais, {
            foreignKey: 'pais_id',
            as: 'pais'
        });

        Provincia.hasMany(models.Contacto, {
            foreignKey: 'provincia_id',
            as: 'contactos'
        });
    };

    return Provincia;
};