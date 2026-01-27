'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class events extends Model {
        static associate(models) {
            events.hasMany(models.ticket_types, {
                foreignKey: "event_id",
            });
        }
    }
    events.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        start_date: DataTypes.STRING,
        ending_date: DataTypes.STRING,
        location: DataTypes.STRING,
        event_producer: DataTypes.STRING,
        state: DataTypes.STRING,
        capacity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'events',
    });
    return events;
};
//# sourceMappingURL=events.js.map