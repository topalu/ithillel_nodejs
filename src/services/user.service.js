import crypto from "crypto"
import {getInstance} from "../../src/mongodb/connection.js"
import { ObjectId } from "mongodb"

const users = []

export async function getUsers() {
    const db = await getInstance()

    return db.collection('users').find({}).toArray()
}

export function idExists(id) {
    return !!users.find(user => user.id === parseInt(id))
}

export async function getUser(id) {
    const db = await getInstance()

    return db.collection('users').findOne({"_id": new ObjectId(id)})
}

export function getUserByEmail(email) {
   return users.find(user => user.email === email)
}

export function verifyPass(user, password) {
    const hash = getHashByPassword(password)

    return hash === user.password
}

export async function postUser(user) {
    user['password'] = getHashByPassword(user.password)

    const db = await getInstance()

    return db.collection('users').insertOne(user)
}

function getHashByPassword(pass) {
    console.log({ pass })
    return crypto.createHash("md5").update(pass).digest().toString("hex")
}