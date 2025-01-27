import Logger from "./logger/logger.js";

const logger  = new Logger()

logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")
logger.error(new Error(''))

console.log({
    APP_ENV: process.env['APP_ENV'],
    DB_PASS: process.env['DB_PASS'],
    PID: process.pid
})

const p = process.env


setInterval(() => {
    const timestemp = new Date().toISOString()

    logger.info(`${timestemp}`)
}, 10_000)

// process.on("SIGINT", () => { // CTR + C
//     console.log("SIGINT terminate ....")

//     setTimeout(() => {
//         process.exit(1)
//     }, 2_000)
//     // 
// })

// process.on("SIGTERM", () => {
//     console.log("SIGTERM terminate ....")

//     // db.close()

//     setTimeout(() => {
//         process.exit(1)
//     }, 2_000)
// })

process.on('uncaughtException', (err) => {
    console.log('uncaughted Exception', err.message)

    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.log('unhandled Rejection', err.message)

    process.exit(1)
})