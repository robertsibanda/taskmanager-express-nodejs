const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user");

require("dotenv").config()

const Signup = async (req, res) => {
    const { username, password , email } = req.body;
    if (!username || !password) return res.json({error: "missing request data"})

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({username, password: hashedPassword, email, runValidators: true})
        .then(user => {
            //create a token and send back to client
            const { username } = user
            req.user = { username }
            GenerateToken(req, res)
        })
        .catch(error => {
            return res.json({error})
        })
}

const Login = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return res.json({ error: "missing request data"})
    await User.findOne({ username })
        .then(async user => {
            const valid_password = await bcrypt.compare(password, user.password)
            if(valid_password) {
                const { username } = user
                req.user = { username }
                GenerateToken(req, res)
            }
            else return res.json({ error : "wrong username/password"})
        })
}

function GenerateToken(req, res){
    // generate access and refresh token using .env keys and username
    const AccessToken =  jsonwebtoken.sign(
        { user : req.user.username},
        process.env.ACCESS_SECRET,
        { expiresIn: "2d"});

    const RefreshToken = jsonwebtoken.sign(
        {user : req.user.username},
        process.env.REFRESH_SECRET,
        {expiresIn: "10d"});

    // send tokens to user
    res.json({ access : AccessToken, refresh : RefreshToken});
}


module.exports = {
    Signup,
    Login
}