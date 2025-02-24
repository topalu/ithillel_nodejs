import {Router} from "express"
import { loginValidator, registrationValidator } from "../validators/jwt.validator.js"
import { signUp, signIn, account } from "../controllers/jwt.controller.js"
import { sessionMiddleware } from "../middleware/sessionAuth.js"
import { jwtMiddleware } from "../middleware/jwtAuth.js"

export const jwtRouter = Router()

jwtRouter.get("/account", jwtMiddleware, account)
jwtRouter.post("/register", registrationValidator, signUp)
jwtRouter.post("/login", loginValidator, signIn)
// jwt.get("/logout", logout)
