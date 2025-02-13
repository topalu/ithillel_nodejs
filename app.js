import http from "node:http"
import https from "node:https"
import http2 from "node:http2"
import fs from "node:fs"
import {parse} from "querystring"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { hostname } from "node:os"
import Logger from "./logger/logger.js"
import {getUser} from "./src/services/user.service.js"
import express from "express"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const logger = new Logger()

global.__filname = __filname
global.__dirname = __dirname

const APPP_PORT = 3000


const server = http.createServer()

server.on("request", (req, res) => {

    if (String(req.url).startsWith('/upload')) {

        const contentType = req.headers['content-type']

        const boundary = `--${contentType.split('boundary=')[1]}`

        console.log({ contentType, boundary })

        let body = Buffer.alloc(0)

        req.on("data", chunk => {
            body = Buffer.concat([body, chunk])
        })

        req.on("end", () => {
            const parts = body.toString('utf8')
            .split(boundary)
            .filter(part => part.trim() && part !== "--")

            let fileName = ''
            let fileData = Buffer.alloc(0)
            const formFields = {}

            parts.forEach(part => {

                const [headers, contant] = part.split('\r\n\r\n')

                if (headers.includes("filename=")) {
                    fileName = headers.match(/filename="(.+?)"/)[1]
                    fileData = Buffer.from(String(contant).trim(), 'binary')
                } else {
                    const nameMatch = headers.match(/name="(.+?)"/)

                    if (nameMatch) {
                        formFields[nameMatch[1]] = String(contant).trim()
                    }
                }
            })

            if (fileName) {
                const filePath = path.join(__dirname, 'src', 'uploads', fileName)
                fs.writeFileSync(filePath, fileData)
            }

            console.log({ formFields })

        })

        res.writeHead(200, {
            "content-type": "text/plain"
        })
        res.end("File uploaded")
        return 
    }

    if (String(req.url).startsWith('/static')) {
        let fileData = staticRoutes(req)

        if (fileData) {
            res.writeHead(200, {
                "content-type": "text/html"
            })
    
            res.end(fileData)
            return
        }
    }

    if (String(req.url).startsWith('/api/v1/')) {

        const routes = apiRoutes()

        for(const route of routes) {
            const match = String(req.url).match(route.pattern)

            if (match) {
                const data = route.handler(match[1])

                res.writeHead(200, {
                    "content-type": "application/json"
                })

                res.end(JSON.stringify(data))

                return
            }
        }
    }

    res.writeHead(404, {
        "content-type": "text/html"
    })

    res.end(getNotFoundPage())
})

function apiRoutes() {
    return [
        { pattern: /^\/api\/v1\/users\/(\d+)$/,  handler: async (id) => getUser(id) },
        { pattern: /^\/api\/v1\/posts\/(\d+)$/, handler: (id) =>  getPost(id)}
    ]
}

// function getUser(id) {
//     console.log({id})
//     return {
//         firstName: "John",
//         age: 30
//     }
// }

function getPost(id) {
    return {
        title: "Nodejs",
    }
}


function staticRoutes(req) {
    const filePath = `${global.__dirname}${req.url}`

    if (!fs.existsSync(filePath)) {
        return false
    }

    if (fs.lstatSync(filePath).isDirectory()) {
        throw new Error("403 Forbidden action")
    }

    if (fs.lstatSync(filePath).isFile()) {
        return fs.readFileSync(filePath)
    }

    return false
}

function getNotFoundPage() {
    const filePath = `${global.__dirname}/static/404.html`

    return fs.readFileSync(filePath)
}

server.listen(APPP_PORT, () => {
    logger.info(`HTTP Server is listening on port ${APPP_PORT}`)
})