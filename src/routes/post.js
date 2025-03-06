import {Router} from "express"
import {getPosts} from "../controllers/post.controller.js"

export const postRouter = Router()

postRouter.get("/", getPosts)
// postRouter.get("/:id", getUser)