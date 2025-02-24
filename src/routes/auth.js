import {Router} from "express"
import { loginValidator, registrationValidator } from "../validators/auth.validator.js"
import { signUp, signIn, logout } from "../controllers/auth.controller.js"
import { sessionMiddleware } from "../middleware/sessionAuth.js"

export const authRouter = Router()

authRouter.get("/", (_, res) => res.render("registration", {title: "Registration Page"}))
authRouter.get("/login", (_, res) => res.render("login", {title: "Login Page"}))
authRouter.get("/account", sessionMiddleware, (_, res) => res.render("account", {title: "My Account"}))


authRouter.post("/register", registrationValidator, signUp)
authRouter.post("/login", loginValidator, signIn)
authRouter.get("/logout", logout)
// authRouter.post("/account", registrationValidator, account)