import sum from "./module/math.js"
import fs from "node:fs"
// import dotenv from "dotenv"
import "./mA.js"
import "./mB.js"

const p = new Promise(( res, rej) => {
    setTimeout(() => {
        res(12)
    }, 2000)
})

// console.log(1);

// ( async () => {
    // const promiseResponse = await p
    // p.then(promiseResponse => {
    //     console.log({ promiseResponse })
    // })

    // console.log({ promiseResponse })
// })()

// console.log(2)

// const res = sum(5, 4)
// console.log(res);
