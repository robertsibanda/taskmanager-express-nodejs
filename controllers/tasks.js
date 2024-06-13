const User = require("../models/user");
const Task = require("../models/task")

//task { title, content, completed, created_at }
const createTask = async (req, res) => {
    let { title, content } = req.body
    if (!title) return res.json({ error : "title is required"})
    if (!content) content =  title

    await User.findOne({ username: req.user})
        .then(async user => {
            if (!user) return res.json({ error : "user does not exists"})
                await Task.create( {
                    user: req.user,
                    title,
                    content,
                    completed: false,
                    createdAt: new Date().toDateString()})
                .then(async task => {
                    return res.json({ success: "task created"})
                })
            
        })
        .catch(error => {
            return res.json({ error })
        })
}

const updateTask = async (req, res) => {
    // update { key: value }
    let { title, content, completed,  }  = req.body
    const id = req.params['id']

    if (!id) return res.json({error : "field id is required"})
    await Task.findOneAndUpdate(
        {_id : id, user: req.user},
        { title, content, completed },
        {new : true})
        .then(task => {
            if (!task) return res.json({ error : "task not found" })
            return res.json({ task})
        })
        .catch(error => {
            return res.json({ error })
        })
}

const deleteTask = async (req, res) => {
 const { id }  = req.body
    if (!id) return res.json({error : "field id is required"})
    await Task.findOneAndDelete({_id : id, user : req.user})
        .then(result => {
        return res.json({ success: `task ${id} deleted`})
        })
        .catch(error => {
            return res.json({ error })
        })
}


const getALlTasks = async (req, res) => {
    await Task.find({ user: req.user})
        .then(tasks => {
            return res.json({ tasks })
        })
        .catch(error => {
            return res.json({ error })
        })
}

const getTask = async (req, res) => {
    const { id } = req.body
    if (!id) return res.json({ error : "id is required"})
    await Task.findOne({ _id : id, user : req.user})
        .then(task => {
            return res.json({ task })
        })
        .catch(error => {
            return res.json({ error })
        })
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getALlTasks,
    getTask
}