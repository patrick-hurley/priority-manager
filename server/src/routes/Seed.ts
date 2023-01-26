import express from 'express'
const router = express.Router()
import { sequelize } from '../models'
import Question from '../models/Question'
import User from '../models/User'

const seedQuestions: [] = require('../data/seed/questions')
const seedUsers: [] = require('../data/seed/users')

/**
 * POST /v1/api/seed/reset
 * @summary Seed database to original state.
 * @tags seed
 * @return 200 - Success response - application/json
 */
router.post('/', async (_req, res) => {
    try {
        await sequelize.sync({ force: true })
        await Question.bulkCreate(seedQuestions)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

/**
 * POST /v1/api/seed/users
 * @summary Seed database with users.
 * @tags seed
 * @return 200 - Success response - application/json
 */
router.post('/users', async (_req, res) => {
    try {
        await sequelize.sync({ force: true })
        await Question.bulkCreate(seedQuestions)
        await User.bulkCreate(seedUsers)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

export default router
