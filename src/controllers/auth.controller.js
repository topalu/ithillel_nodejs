
import {getUserByEmail, getUsers as getUsersService, postUser, verifyPass} from "../services/user.service.js"


export function signUp(req, res) {
    const user = req.body

    console.log({ user })

    postUser(user)

    return res.redirect("/auth/login")
}

export function signIn(req, res) {
    const {email, password} = req.body
    const user = getUserByEmail(email)

    if (!user || !verifyPass(user, password)) {
        return res.render("login", {title: "Login Page", error: "Incorrect creds"})
    }

    req.session.user = user

    res.redirect("/auth/account")
}

export function logout(req, res) {

    req.session.destroy()

    res.redirect("/auth/login")
}