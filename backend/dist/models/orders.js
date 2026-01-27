'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class orders extends Model {
        static associate(models) {
            orders.belongsTo(models.users, {
                foreignKey: "user_id",
            }),
                orders.hasMany(models.tickets, {
                    foreignKey: "order_id",
                });
        }
    }
    orders.init({
        user_id: DataTypes.INTEGER,
        purchase_date: DataTypes.STRING,
        total: DataTypes.FLOAT,
        state: DataTypes.STRING,
        payment_method: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'orders',
    });
    return orders;
};
//# sourceMappingURL=orders.js.map