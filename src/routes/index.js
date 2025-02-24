import {Router} from "express"
import {userRouter} from "./user.js"
import {viewRouter} from "./view.js"
import {authRouter} from "./auth.js"
import {jwtRouter} from "./jwt.js"

export const router = Router()

router.use("/users", userRouter)
router.use("/view", viewRouter)
router.use("/auth", authRouter)
router.use("/jwt", jwtRouter)