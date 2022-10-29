import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/todo-list")
        console.log(`Connected to Mongo! DB: ${db.connections[0].name}`)
    } catch (error) {
        console.error(error)
    }
}
connectDB()
