import {Router} from "express"
import {getUsers, createUser} from "../controllers/user.controller.js"
import { createUserValidator } from "../validators/user.validator.js"
import { logMiddleware } from "../middleware/logs.js"

export const userRouter = Router()

userRouter.get("/", getUsers)

userRouter.post("/", logMiddleware, createUserValidator, createUser)


userRouter.put("/:userId", (req, res) => {
    res.json({"method": "get"})
})

userRouter.delete("/:userId", (req, res) => {
    res.json({"method": "get"})
})

// userRouter.route("/")
//     .get((req, res) => {
//         res.json({"method": "get"})
//     })
//     .post((req, res) => {

//         console.log("post", { body: req.body })

//         res.json({"method": "post"})
//     })
//     .delete((req, res) => {
//         res.json({"method": "delete"})
//     })

//     userRouter.get("/info", (req, res) => {
//         console.log("info")
//         res.json({"method": "get"})
//     })