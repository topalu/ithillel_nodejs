import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../controllers/jwt.controller.js"

export const jwtMiddleware = (req, res, next) => {
    
    if (! req.headers['authorization']) {
        return res.json({error: "missing token"})
    }

    const token = String(req.headers['authorization']).split(' ')[1]

    try {
        const data = jwt.verify(token, JWT_SECRET)

        console.log({ data })
    } catch(err) {
        return res.json({
            status: "Error",
            err
        })
    }


    next()
}

// s%3A7kXn6Ofis-rEZen4WoWTECExoJtI9YUC.sVawulUtETBSdFuwQ%2B62xD4SxIgoFEra48n0%2FvD21%2B4