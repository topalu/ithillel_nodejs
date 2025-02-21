import {Router} from "express"
import {userRouter} from "./user.js"
import {viewRouter} from "./view.js"

export const router = Router()

router.use("/users", userRouter)
router.use("/view", viewRouter)