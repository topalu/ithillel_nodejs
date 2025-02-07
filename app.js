import http from "node:http"
import { Writable } from "node:stream"
import fs from "node:fs"
import {parse} from "querystring"


const APPP_PORT = 3000

const server = http.createServer((request, response) => {

    console.log("URL", request.url, "Method", request.method, "heders",  request.headers)
    const writeStream = fs.createWriteStream("http-data.txt")
    request.pipe(writeStream)

    if (request.method === 'POST') {

        let body = ''
        request.on("data", (data) => {
            body += data.toString()
        })

        request.on("end", () => {

            let res = ''

            switch(String(request.headers['content-type']).toLocaleLowerCase()) {
                case "application/x-www-form-urlencoded":
                res = parse(body)
               break
               case "application/json":
                res = JSON.parse(body)
                   
               break
               case "text/plain":
                res = body
               break 
               case "multipart/form-data":
               break 
           }


            console.log({ res })
        })
    }


    response.writeHead(200, {
        "content-type": "application/json",
        // "connection": "close"
    })

    response.end(JSON.stringify({"key": "value"}))
})


server.listen(APPP_PORT, () => {
    console.log("Server listen 3000 port")
})