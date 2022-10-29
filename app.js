import express from 'express'
import './config/db.config.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) =>{
    res.send("It's working!")
})


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000 port`)
})
