const router = require  ("express").Router()
const { createTask, updateTask, deleteTask, getALlTasks, getTask} = require("../controllers/tasks")
const auth = require("../middleware/authentication")

router.route('/')
    .post(auth, createTask)
    .get(auth, getALlTasks)

router.route('/:id')
    .get(auth,getTask)
    .put(auth, updateTask)
    .delete(auth, deleteTask)

module.exports = router