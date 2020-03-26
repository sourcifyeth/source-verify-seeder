import App from './app'

import dotenv from 'dotenv'

import HomeRoute from './routes/homeRouter'
import bodyParser from 'body-parser'
import errorMiddleware from './middleware/errorMiddleware'
import {loggerMiddleware} from './middleware/logger'
import {db} from "./database/models/init";

dotenv.config()

const appInstance: any = new App({
    port: parseInt(process.env.SERVER_PORT, 10),
    database: db
})
appInstance.app.use(bodyParser.json())
appInstance.app.use(bodyParser.urlencoded({extended: true}))
appInstance.app.use(loggerMiddleware)
appInstance.app.use(errorMiddleware)
appInstance.app.use('/', new HomeRoute().router)

appInstance.listen()