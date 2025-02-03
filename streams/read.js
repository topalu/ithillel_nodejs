import { Readable, Writable, Duplex } from "node:stream"
import { createReadStream } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

const d = ["Hello", "World", "!"]

// let i = 0
// const stream = new Readable({
//     read() {

//         if (i < d.length) {

//             this.push(d[i])
//             i++

//         } else {
//             this.push(null)
//         }

//         // this.push("123")
//         // this.push("345")
//         // this.push("567")

        
//     }
// })

// class ReadableClass extends Readable {
//     constructor(filename, options = {}) {
//         super(options)

//         this.fd = fs.openSync(filename, '')
//         this.bufferSize = options['bufferSize'] || 16384
//         this.position = 0
//     }

//     _read(size) {
//         const buffer = Buffer.alloc(size)
//         fs.read(this.fd, buffer, 0, size, this.position, (err, bytesRead) => {

//             if (err) {
//                 this.destroy(err)
//                 return 
//             }

//             if (bytesRead > 0) {
//                 this.push(buffer.subarray(0, bytesRead))

//                 this.position += bytesRead
//             } else {
//                 this.push(null)
//                 fs.closeSync(this.fd)
//             }

//         })
//     }

//     _destroy(err, cb) {
//         if (this.fd) {
//             fs.closeSync(this.fd)
//         }

//         if (cb) {
//             cb(err)
//         }
//     }
// }

const filePath = path.join(__dirname, 'users.txt')

// const stream = new ReadableClass(filePath, {
//     highWaterMark: 64 * 1024,
//     encoding: "utf8"
// })

// const readStream = fs.createReadStream(filePath, {
//     highWaterMark: 64 * 1024,
//     encoding: "utf8"
// })

// const writeStream = fs.createWriteStream("new-users.txt", {
//     encoding: "utf8"
// })

// readStream.on("data", async (chunk) => {
    // console.log(chunk.toString("utf8"))
    // stream.pause()
    // await sleep(1000)
    // stream.resume()

    // writeStream.write(chunk)
// })

// readStream.on('end', () => {
//     console.log('Stream finished')

//     writeStream.end()
// })

// readStream.on("error", (err) => {
//     console.log(err)
// })

// readStream.pipe(writeStream)

// const writable = new Writable({
//     write(chunk, enc, next) {
//         console.log("Got: ", chunk.toString("utf8"))

//         setTimeout(next, 1000)
//     }
// })

// class WritableStream extends Writable {

//     _write(chunk, enc, next) {
//         console.log("Got: ", chunk.toString("utf8"))

//         setTimeout(next, 1000)
//     }

// }

// const wStream = new WritableStream()

// wStream.write("Hello")
// wStream.write("World")
// wStream.write("!")

// wStream.end("End data")

// let i = 1_000_000

// function write() {
//     let success = true

//     while(i > 0) {
//         success = wStream.write(`Line number : ${i} \n`)
//         i--

//         if (!success) {
//             console.log({ i })
//         }
//     }

//     if (i > 0) {
//         wStream.once("drain", write)
//     } else {
//         wStream.end();
//     }
// }

// write()

const data = ["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4"]

class OwnDuplex extends Duplex {
    constructor(op) {
        super(op)
        // this.data = ["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4"]
    }

    _read(size) {
    //     if (data.length > 0) {
    //         this.push(data.shift())
    //     } else {
    //         this.push(null)
    //     }
    }

    _write(chunk, encoding, next) {
        // console.log("Write", chunk.toString('utf8'))

        this.push(chunk.toString('utf8').toUpperCase())

        next()
    }
}

const duplex = new OwnDuplex()

duplex.on("data", chunk => {
    console.log("On data", chunk.toString('utf8'))
})

duplex.write("write str1")
duplex.write("write str2")

duplex.on("error", (err) => {
    console.log(err)
})

duplex.end()