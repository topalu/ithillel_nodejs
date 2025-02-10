import http from "node:http"
import fs from "node:fs"
import {parse} from "querystring"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { hostname } from "node:os"
import Logger from "./logger/logger.js"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const logger = new Logger()

global.__filname = __filname
global.__dirname = __dirname

const APPP_PORT = 3002

const server = http.createServer()

server.on("request", (request, response) => {

    response.writeHead(200, {
        "content-type": "application/json"
    })

    response.end(JSON.stringify({
        "testKey": "testValue",
        random: Math.random()
    }))
})


server.listen(APPP_PORT, () => {
    logger.info(`Server is listening on port ${APPP_PORT}`)
})