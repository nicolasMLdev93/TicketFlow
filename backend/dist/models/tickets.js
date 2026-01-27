'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tickets extends Model {
        static associate(models) {
            tickets.belongsTo(models.orders, {
                foreignKey: "order_id",
            }),
                tickets.belongsTo(models.ticket_types, {
                    foreignKey: "ticket_type_id",
                });
        }
    }
    tickets.init({
        order_id: DataTypes.INTEGER,
        ticket_type_id: DataTypes.INTEGER,
        issue_date: DataTypes.STRING,
        state: DataTypes.STRING,
        price: DataTypes.FLOAT,
        qr_code: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'tickets',
    });
    return tickets;
};
//# sourceMappingURL=tickets.js.map