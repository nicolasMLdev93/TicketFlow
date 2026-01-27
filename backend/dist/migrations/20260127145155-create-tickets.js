'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tickets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_id: {
                type: Sequelize.INTEGER
            },
            ticket_type_id: {
                type: Sequelize.INTEGER
            },
            issue_date: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.FLOAT
            },
            qr_code: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tickets');
    }
};
//# sourceMappingURL=20260127145155-create-tickets.js.map