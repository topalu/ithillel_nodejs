import crypto from "crypto"
import {getInstance} from "../../src/mongodb/connection.js"
import { ObjectId } from "mongodb"
import { faker } from '@faker-js/faker';


const users = []

export async function getUsers() {
    const db = await getInstance()

    // const fn = () => faker.helpers.arrayElement(["js", "php", "nodejs", "c#", "c++", "pyton", "go", "swift"])
    
    // const getSkills = () => {
    //     return [...new Set([...Array(3)].map(fn))]
    // }

    // const users = Array.from({length: 100}, () => ({
    //     name: faker.person.fullName(),
    //     emit: faker.internet.email(),
    //     password: faker.internet.password(),
    //     birthday: faker.date.between({ from: "1980-01-01", to: "2000-01-01"}),
    //     sex: faker.person.sex(),
    //     ages: faker.number.int({min: 18, max: 50}),
    //     skills: getSkills()
    // }))   

    // await db.collection('users').insertMany(users)

    // const cursor = db.collection('users')
    //     .find({ ages: { $gt: 30 } })
    //     .skip(100)
    //     .limit(20)
    //     .sort({ ages: -1 })

    // const users = []

    // for await (const user of cursor) {
    //     users.push(user)
    // }
    // console.log({ users: users.length })

    // const response = db.collection('users').aggregate([
    //     { $group: { _id: "$sex", avarageAge: { $avg: "$ages" } } }
    // ]).toArray()

    // const response = db.collection('users').aggregate([
    //     { $unwind: "$skills" },
    //     { $group: { _id: "$skills", count: { $sum: 1 } } },
    //     { $sort: {count: -1 } },
    //     // { $limit: 5 }
    // ]).toArray()

    const response = db.collection('users').aggregate([
        {
            $project: {
                emailDomain: { $arrayElemAt: [ {$split: [ "$emit", "@"]}, 1 ] }
            },
        },
        {
            $group: {
                _id: "$emailDomain", count: {$sum: 1}
            }
        }

        // { $unwind: "$skills" },
        // { $group: { _id: "$skills", count: { $sum: 1 } } },
        // { $sort: {count: -1 } },
        // { $limit: 5 }
    ]).toArray()

    return response
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