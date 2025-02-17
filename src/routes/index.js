import {Router} from "express"


export const router = Router()

const middleware = (req, res, next) => {
    console.log("middleware log")

    // res.status(403).send("error")
    // return
    next()
}

// router.all('/', (req, res) => {
//     res.send("Hello from Express")
// })

router.get("/users/:id/post/:postId", (req, res) => {
    console.log({ req: req.params })
    res.send(req.url)
})

router.get("/flights/:from-:to", (req, res) => {
    console.log({ req: req.params })
    res.send(req.url)
})

router.route("/info")
    .get(middleware, (req, res) => {
        console.log("/user/:path", req.params)
        res.json({"method": "get"})
    })
    .post((req, res) => {
        res.json({"method": "post"})
    })
    .delete((req, res) => {
        res.json({"method": "delete"})
    })