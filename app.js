import path from "node:path"
import { fileURLToPath } from "node:url"
import Logger from "./logger/logger.js"
import express from "express"
import {router} from "./src/routes/index.js"
import {restriction} from "./src/middleware/request-restriction.js"
import session from "express-session"
// import {getInstance} from "./src/mongodb/connection.js"
import sequelize from "./src/models/index.js"

const __filname = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filname)

const logger = new Logger()

global.__filname = __filname
global.__dirname = __dirname

const APPP_PORT = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "src/views"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// await getInstance()

// app.use(restriction)
app.use("/", router)

app.use((req, res, next) => {
    res.status(404).send("Not Found")
})

// app.use((error, req, res, next) => {
//     console.log({
//         msg: error?.message
//     })

//     res.status(500).send("error on server side")
// })

app.listen(APPP_PORT, () => {
    logger.info(`Express is listening on port ${APPP_PORT}`)
})