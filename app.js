import path from "node:path"
import { fileURLToPath } from "node:url"
import Logger from "./logger/logger.js"
import {getUser} from "./src/services/user.service.js"
import express, {json} from "express"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const logger = new Logger()

global.__filname = __filname
global.__dirname = __dirname

const APPP_PORT = 3000

const server = express()

server.use(json())

server.post('/', (req, res) => {
    console.log({ body: req.body })
    res.send("Hello from Express")
})

server.listen(APPP_PORT, () => {
    logger.info(`Express is listening on port ${APPP_PORT}`)
})