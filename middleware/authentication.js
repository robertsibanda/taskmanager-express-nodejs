const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config()

const authentication = async (req, res, next) => {
    // validate the token and verify the user
    // headers.authorization 'Bearer {access-token}'

    const authorizationHeaders = req.headers.authorization
    try{
        const token = authorizationHeaders.split(" ")[1]
        if (token == null || undefined) return res.json({ error : "authentication error"})
        await jsonwebtoken.verify(token, process.env.ACCESS_SECRET,
            (err, data) => {
                if (err) return res.json({ error : "authentication error"})
                const { user } = data
                req.user = user
                console.log("User : ", req.user)
                next()
            })
    }catch (ex) {
        return res.json({ error: "authentication error"})
    }
}

module.exports = authentication