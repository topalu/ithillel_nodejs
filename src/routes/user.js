import {Router} from "express"

export const userRouter = Router()

userRouter.route("/")
    .get((req, res) => {
        res.json({"method": "get"})
    })
    .post((req, res) => {

        console.log("post", { body: req.body })

        res.json({"method": "post"})
    })
    .delete((req, res) => {
        res.json({"method": "delete"})
    })

    userRouter.get("/info", (req, res) => {
        console.log("info")
        res.json({"method": "get"})
    })