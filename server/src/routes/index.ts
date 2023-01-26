import express from 'express'
const router = express.Router()

import Question from './Question'
import User from './User'
import Seed from './Seed'

router.use('/questions', Question)
router.use('/users', User)

if (process.env.NODE_ENV !== 'production') {
    router.use('/seed', Seed)
}

export default router
