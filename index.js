import Logger from "./logger/logger.js";

const logger = new Logger();

// logger.info("Info message")
// logger.warning("Warning message")
// logger.error("Error message")
// logger.error(new Error(''))

// console.log({
//     APP_ENV: process.env['APP_ENV'],
//     DB_PASS: process.env['DB_PASS'],
//     // PID: process.pid // required row
// })

// const p = process.env

// setInterval(() => {
//     const timestemp = new Date().toISOString()

//     logger.info(`${timestemp}`)
// }, 10_000)

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


logger.info("Info message")

setTimeout( () => {
    logger.info("setTimeout 0")

}, 0)

setTimeout( () => {
    logger.info("setTimeout 2000")

}, 2_000);

logger.info("Info message 2")

const p = new Promise((res, rej) => {
    res(1)
});

const p2 = new Promise((res, rej) => {
    
    setTimeout( () => {
        res(12)
    }, 1000);
    logger.info("inner Promise")
});

Promise.race([p, p2])
.then(res => {
    console.log("all", res )
})
.catch(ref => {
    console.log("ref all", ref )
})

// p.then(res => {
//     logger.info("Promise res")
// })
// .catch(err => {
//     logger.info("Promise rej")
// })

// logger.info("Info message 3")

// p2.then(res => {
//     logger.info("Promise2 res")
// })
// .catch(err => {
//     logger.info("Promise2 rej")
// })

// setImmediate(res => {
//     logger.info("setImmediate")
// })

// logger.info("Info message last")

// process.nextTick(() => {
//     logger.info("nextTick")
// })

// logger.info("now")

//  await sleep(10_000)

// logger.info("after 10 sec")

// const timer = setInterval(() => {
//     logger.info("setInterval")
// }, 1000)

// setTimeout(() => {
//     clearInterval(timer)
// }, 5000)
