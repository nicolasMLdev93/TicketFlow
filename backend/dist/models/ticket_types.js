'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ticket_types extends Model {
        static associate(models) {
            ticket_types.belongsTo(models.events, {
                foreignKey: "event_id",
            }),
                ticket_types.hasMany(models.tickets, {
                    foreignKey: "ticket_type_id",
                });
        }
    }
    ticket_types.init({
        event_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        available_quantity: DataTypes.INTEGER,
        description: DataTypes.STRING,
        sale_start_date: DataTypes.STRING,
        sale_end_date: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ticket_types',
    });
    return ticket_types;
};
//# sourceMappingURL=ticket_types.js.map