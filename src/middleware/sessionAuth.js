export const sessionMiddleware = (req, res, next) => {
    
    const {user} = req.session

    console.log({session: req.session})

    if (!user) {
        res.redirect("/auth/login")
    }

    next()
}

// s%3A7kXn6Ofis-rEZen4WoWTECExoJtI9YUC.sVawulUtETBSdFuwQ%2B62xD4SxIgoFEra48n0%2FvD21%2B4