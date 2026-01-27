"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            users.hasMany(models.orders, {
                foreignKey: "user_id",
            });
        }
    }
    users.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        role: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "users",
    });
    return users;
};
//# sourceMappingURL=users.js.map