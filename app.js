import express from "express";
import "./config/db.config.js";
import Todo from "./models/Todo.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//Homepage
app.get("/", (req, res) => {
  res.send("It's working!");
});

//Get all Todos
app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find();
  res.status(200).json(allTodos);
});

//Post Todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const { body } = req;

  try {
    const todoFind = await Todo.findOne({ title: title });
    if (todoFind) {
      console.log(`${todoFind.title} already exists!`);
      return res.status(404).json({ msg: "Todo already exists!" });
    }

    const newTodo = await Todo.create(body);
    res.status(201).json(newTodo);
    console.log(`${title} created successfully`);
  } catch (error) {
    res.status(400).json({ status: 400, msg: error });
  }
});

//Update Todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const old = await Todo.findById(id);
    const update = { completed: `${!old.completed}` };
    const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(update);
    console.log(`${update.title} updated successfully`);
  } catch (error) {
    res.status(400), json({ status: 400, msg: error.message });
  }
});

//Delete Todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndRemove(id);
    if (todo) {
      res.status(201).json({ msg: `${todo.title} deleted successfully` });
      console.log(`${todo.title} deleted successfully`);
    } else {
      res.status(404).json({ msg: "Not found" });
      console.log("Not found!");
    }
  } catch (error) {
    res.status(400), json({ status: 400, msg: error.message });
  }
});

//Listening
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000 port`);
});
