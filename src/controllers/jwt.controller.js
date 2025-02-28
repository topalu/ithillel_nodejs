import {getUserByEmail, postUser, verifyPass} from "../services/user.service.js"
import jwt from "jsonwebtoken"

export const JWT_SECRET = 'superSecret'

export function signUp(req, res) {
    const user = req.body

    postUser(user)

    return res.json({
        status: "OK"
    })
}

export function signIn(req, res) {
    const {email, password} = req.body
    const user = getUserByEmail(email)

    if (!user || !verifyPass(user, password)) {
        return res.json({
            status: "Error",
            message: "Incorrect creds"
        })
    }

    const token = jwt.sign({ 
        email: user.email,
        role: ['admin', 'dev'],
        permissions: ['read', 'write']
     }, JWT_SECRET, {
        expiresIn: 60
    })

    const token2 = jwt.sign({ 
        email: user.email,
        role: ['admin', 'dev'],
        permissions: ['read', 'write']
     }, JWT_SECRET, {
        expiresIn: '2days'
    })

    return res.json({
        status: "OK",
        token,
        refrashToken: token2
    })
}

export function account(req, res) {
    return res.json({
        status: "OK",
        "path": "My account"
    })
}

// const users = Map()

// users.count()


// C R U D 