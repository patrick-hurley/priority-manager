// Enable dotenv
import dotenv from 'dotenv'
dotenv.config()

import { sequelize } from './models'
import './models/associations'
import app from './app'

// logging
import prettyerror from 'pretty-error'
prettyerror.start()
import colors from 'colors'
colors.enable()
import logger from './config/logger'

process.on('warning', (e) => logger.warn(e.stack))

/*
-------------------------------
Start server
-------------------------------
*/
sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT, async () => {
            console.log(
                '\n\nš  ' + `Server started on port: ${process.env.PORT}`
            )
            console.log('šµ ' + `Environment: ${process.env.HOSTING_ENV}`)
            console.log(
                'šŖ ' +
                    `Email sending: ${
                        parseInt(process.env.SEND_EMAIL) ? 'on' : 'off'
                    }\n\n`
            )
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })
