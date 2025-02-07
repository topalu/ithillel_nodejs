import { Readable, Writable, Duplex, Transform, pipeline } from "node:stream"
import { createReadStream } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
import zlib from "node:zlib"
import crypto from "node:crypto"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const sourceFilePath = path.join(__dirname, 'sectet')
const desctionationFilePath = path.join(__dirname, 'data.txt')

const readStream = fs.createReadStream(sourceFilePath)
const writeStream = fs.createWriteStream(desctionationFilePath)

const zipTransformer = zlib.createGzip()
const upzipTransformer = zlib.createGunzip()

const transformStream = new Transform({
    transform(ch, encoding, callback) {

        this.push(String(ch.toString()).toUpperCase())
        callback()
    }
})

class EncryptTransformer extends Transform {
    constructor(secter) {
        super()

        this.cipher = crypto.createCipher('aes-256-cbc', secter)
    }

    _transform(ch, encoding, callback) {

        const encrypted = this.cipher.update(ch)

        console.log(encrypted.toString("hex"))

        this.push(encrypted)
        callback()
    }

    _flush(callback) {
        this.cipher._final()

        callback()
    }
}

class DecryptTransformer extends Transform {
    constructor(secter) {
        super()

        this.decipher = crypto.createDecipher('aes-256-cbc', secter)
    }

    _transform(ch, encoding, callback) {

        const decrypted = this.decipher.update(ch)

        console.log(decrypted.toString("utf8"))

        this.push(decrypted)
        callback()
    }
}

const encryptTransformer = new EncryptTransformer("my-super-secret")
const decryptTransformer = new DecryptTransformer("my-super-secret")

// const encryptTransformer = new Transform({
//     transform(ch, encoding, callback) {

//         this.push(String(ch.toString()).toUpperCase())
//         callback()
//     }
// })


// readStream.on('data', (ch) => {
//     console.log(ch.toString())
// })

// pipeline(
//     readStream,
//     transformStream,
//     zipTransformer,
    
// )

readStream
    // .pipe(transformStream)
    // .pipe(zipTransformer)
    .pipe(decryptTransformer)
    .pipe(writeStream)