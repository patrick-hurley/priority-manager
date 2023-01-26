import logger from '../config/logger'
import { Response } from 'express'

export default {
    reject: function (error: any, res: Response, stack = null, httpCode = 400) {
        let message

        if (Array.isArray(error.details)) {
            message = error.details.map((error: any) => {
                return error.message
            })
        } else {
            message = error
        }

        if (stack) {
            logger.error(stack)
        } else {
            logger.info(error)
        }

        res.status(httpCode).send({
            error: message,
        })
    },
}
