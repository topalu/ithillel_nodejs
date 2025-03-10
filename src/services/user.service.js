import crypto from "crypto"
// import {getInstance} from "../../src/mongodb/connection.js"
// import { ObjectId } from "mongodb"
import { faker } from '@faker-js/faker';
import User from "../models/user.model.js"


const users = []

export async function getUsers() {

    // await User.create({
    //     username: "Bob",
    //     email: "bob@email.com"
    // })

    const users = await User.findAll()


    return users
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