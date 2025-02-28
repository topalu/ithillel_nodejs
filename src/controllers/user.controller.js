import {getUsers as getUsersService, postUser, getUser as getUserService} from "../services/user.service.js"

export async function getUser(req, res) {

    return res.json({
        item: await getUserService(req.params['id'])
    })
}

export async function getUsers(req, res) {

    return res.json({
        list: await getUsersService()
    })
}

export async function createUser(req, res) {
    const user = req.body

    await postUser(user)

    return res.json({ "status": "OK" })
}