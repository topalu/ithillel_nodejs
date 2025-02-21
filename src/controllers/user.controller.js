
import {getUsers as getUsersService, postUser} from "../services/user.service.js"

export function getUsers(req, res) {
    return res.json({
        list: getUsersService()
    })
}

export function createUser(req, res) {
    const {user } = req.body
    postUser(user)

    return res.json({ "status": "OK" })
}