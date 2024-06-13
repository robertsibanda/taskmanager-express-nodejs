const router = require  ("express").Router()
const { Login, Signup} = require("../controllers/authentication")

router.post('/login', Login);
router.post('/signup', Signup)

module.exports = router