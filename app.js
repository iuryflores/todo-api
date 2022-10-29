import express from 'express'
import './config/db.config.js'
import Todo from './models/Todo.js'

const app = express()

app.use(express.json())

//Homepage
app.get('/', (req, res) => {
    res.send("It's working!")
})

//Get all Todos
app.get('/todos', async (req, res) => {
    const allTodos = await Todo.find()
    res.status(200).json(allTodos)
})

//Post Todo
app.post('/todos', async (req, res) => {
    const { body } = req
    try {
        const newTodo = await Todo.create(body)
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(400).json({ status: 400, msg: error.message })
    }
})

//Update Todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const update = { completed: true }
    try {
        const todo = await Todo.findByIdAndUpdate(id, update, { new: true })
        res.status(201).json(update)
    } catch (error) {
        res.status(400), json({ status: 400, msg: error.message })
    }
})

//Delete Todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await Todo.findByIdAndRemove(id)
        if (todo) {
            res.status(201).json({ msg: `${todo.title} deletado com sucesso` })
        } else {
            res.status(404).json({ msg: 'Todo not found' })
        }
    } catch (error) {
        res.status(400), json({ status: 400, msg: error.message })
    }
})

//Listening
app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000 port`)
})
