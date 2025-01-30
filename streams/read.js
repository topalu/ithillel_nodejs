import { Readable } from "node:stream"
import { createReadStream } from "node:fs"
import path from "node:path"

const d = ["Hello", "World"]

// const stream = new Readable({
//     read() {
//         d.forEach(itm => this.push(itm))
//         this.push(null)
//     }
// })

// class ReadableClass extends Readable {
//     constructor(options) {
//         super(options)
//     }

//     _read() {
//         d.forEach(itm => this.push(itm))
//         this.push(null)
//     }
// }

// const stream = new ReadableClass({
//     highWaterMark: 10,
//     encoding: "utf8",
//     objectMode: true
// })

// console.log(path.dirname('.'))

const stream = createReadStream('users.txt', {
    highWaterMark: 1024,
    encoding: "utf8",
})

let count  = 0

stream.on("data", (chunk) => {

    ++count
    console.log(chunk.toString("utf8"))
})

stream.on('end', () => {
    console.log('Stream finished', "count:", `${count}`)
})