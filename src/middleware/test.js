export const testMiddleware = (req, res, next) => {
    console.log("user middleware")

    try {
        throw new Error("access closed")

    } catch (err) {
        next(err)
    } 

    next()
}