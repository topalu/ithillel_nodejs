import {Router} from "express"

export const viewRouter = Router()

const users = [
    {name: "John", age: 30},
    {name: "Anna", age: 22},
]

viewRouter.get("/", (req, res) => {
    res.render("index", {title: "Some title", users})
})

viewRouter.get("/about", (req, res) => {
    res.render("index", {title: "About title", users})
})