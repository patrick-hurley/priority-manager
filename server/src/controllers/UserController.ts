import User from '../models/User'
import logger from '../config/logger'
import { Request, Response } from 'express'

export default {
    async createUser(req: Request, res: Response): Promise<Response> {
        logger.info('Creating user')
        const { name } = req.body
        try {
            const createdUser = await User.create({
                name,
            })
            return res.status(200).send({
                id: createdUser.id,
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAllUsers(_req: Request, res: Response): Promise<Response> {
        logger.info('Getting all users')
        try {
            const foundUsers = await User.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            return res.status(200).send(foundUsers)
        } catch (err) {
            return res.sendStatus(500)
        }
    },

    async deleteUser(req: Request, res: Response): Promise<Response> {
        logger.info('Deleting user')
        try {
            await User.destroy({
                where: {
                    id: req.params.userId,
                },
            })
            return res.status(200).send({ id: req.body.id })
        } catch (err) {
            console.log(err)

            return res.sendStatus(500)
        }
    },
}
