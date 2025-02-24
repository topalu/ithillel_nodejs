import crypto from "crypto"

const users = []

export function getUsers() {
    return users
}

export function idExists(id) {
    return !!users.find(user => user.id === parseInt(id))
}

export function getUser(id) {
   return users.find(user => user.id === parseInt(id))
}

export function getUserByEmail(email) {
   return users.find(user => user.email === email)
}

export function verifyPass(user, password) {
    const hash = getHashByPassword(password)

    return hash === user.password
}

export function postUser(user) {
    user['password'] = getHashByPassword(user.password)
    users.push(user)
}

function getHashByPassword(pass) {
    return crypto.createHash("md5").update(pass).digest().toString("hex")
}