import { QueryInterface } from 'sequelize'

import users from '../data/seed/users'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('users', users, {})
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('users', users, {})
    },
}
