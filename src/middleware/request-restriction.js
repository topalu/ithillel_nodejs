import crypto from "node:crypto"
import moment from "moment"

const requests = new Map()

export function restriction(req, res, next) {

    const ip = req.ip
    const agent = req.header("User-Agent")

    const hash = crypto.createHash("md5").update(`${ip}-${agent}`).digest("hex")
    
    const myRequests = requests.get(hash) || []

    myRequests.push(moment())

    requests.set(hash, myRequests)

    if (myRequests.length > 5) {
        res.status(429).send("Too many requests")
        return
    }

    next()
}

setInterval(() => {

    requests.forEach((value, key, map ) => {
        map.set(key, value.filter((item) => moment().diff(item, "seconds") < 20)
        )
    })

}, 5000)