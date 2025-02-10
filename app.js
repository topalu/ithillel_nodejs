import http from "node:http"
import https from "node:https"
import http2 from "node:http2"
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

const APPP_PORT = 3000

// const options = {
//     key: fs.readFileSync('server.key'),  // Завантажуємо приватний ключ
//     cert: fs.readFileSync('server.cert') // Завантажуємо сертифікат
// };

// const server = http2.createSecureServer(options)
const server = http.createServer()

server.on("request", (req, res) => {


    // const options = {
    //     hostname: 'jsonplaceholder.typicode.com',
    //     // hostname: 'localhost',
    //     path: request.path,
    //     method: request.method,
    //     headers: request.headers,
    //     port: 3002
    // }

    // const proxyReq = http.request(options, (proxyRes) => {
    //     response.writeHead(proxyRes.statusCode, proxyRes.headers)

    //     proxyRes.pipe(response)
    // })

    // request.pipe(proxyReq)

    // proxyReq.on("error", (err) => {
    //     logger.error(err)
    //     response.end("Proxy request failed", err.message)
    // })

    console.log("URL", req.url, "Method", req.method)
    // const writeStream = fs.createWriteStream("http-data.txt")
    // request.pipe(writeStream)

    if (req.method === "GET" && /^\/static/.test(req.url)) {

        res.writeHead(500, {
            "content-type": "text/html"
        })

        // Math.random()

        const filePath = `${global.__dirname}${req.url}`

        const metaData = fs.lstatSync(filePath).isDirectory()

        if (fs.lstatSync(filePath).isDirectory()) {
            throw new Error("403 Forbidden action")
        }

        if (fs.lstatSync(filePath).isFile()) {
            const fileData = fs.readFileSync(filePath)

            res.end(fileData)
        }
        

        console.log({ metaData })

    }

    // console.log("stream ID", stream.id)

    // stream.respond({
    //     ":status": 200,
    //     'content-type': "application/json"
    // })

    // stream.end(JSON.stringify({
    //     value: Math.random()
    // }))
})


server.listen(APPP_PORT, () => {
    logger.info(`HTTP Server is listening on port ${APPP_PORT}`)
})