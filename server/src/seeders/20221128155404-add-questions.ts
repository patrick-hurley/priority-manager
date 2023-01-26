import { QueryInterface } from 'sequelize'

import questions from '../data/seed/questions'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('questions', questions, {})
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('questions', questions, {})
    },
}
