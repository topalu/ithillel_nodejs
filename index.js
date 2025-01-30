import Logger from "./logger/logger.js";
const logger  = new Logger()


process.on('uncaughtException', (err) => {
    console.log('uncaughted Exception', err.message)

    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.log('unhandled Rejection', err.message)

    process.exit(1)
})

// const buffer = Buffer.from("Hello World")
// const base64 = buffer.toString('base64')

// const decode = Buffer.from(base64, 'base64')
// console.log(decode.toString('utf8'))
// console.log(decode.toString('hex'))
// console.log(decode.toString(''))
// console.log(buffer)

// const buffer = Buffer.alloc(8)

// buffer.write("Hello")
// console.log(buffer.toString('utf8'))