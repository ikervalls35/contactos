const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Contacto = sequelize.define('Contacto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
        provincia_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'provincias',
                key: 'id'
            }
        }
    }, {
        tableName: 'contactos',
        timestamps: false
    });

    Contacto.associate = (models) => {
        Contacto.belongsTo(models.Provincia, {
            foreignKey: 'provincia_id',
            as: 'provincia'
        });
    };

    return Contacto;
};