import { Router } from "express";
import Todo from "../models/Todo.model.js";

const router = Router();

//Homepage
router.get("/", (req, res, next) => {
  res.send("It's working!");
});

//Get all Todos
router.get("/todos", async (req, res, next) => {
  
    const allTodos = await Todo.find();
   
    res.status(200).json(allTodos);
 
});

//Post Todo
router.post("/todos", async (req, res, next) => {
  const { title } = req.body;
  const { body } = req;

  try {
    const todoFind = await Todo.findOne({ title: title });
    if (todoFind) {
      console.log(`${todoFind.title} already exists!`);
      return res.status(400).json({ msg: "Todo already exists!" });
    }

    const newTodo = await Todo.create(body);
    res.status(201).json(newTodo);
    console.log(`${title} created successfully`);
  } catch (error) {
    next(error);
  }
});

//Update Todo
router.put("/todos/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const old = await Todo.findById(id);
    const update = { completed: `${!old.completed}` };
    const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(update);
    console.log(`${update.title} updated successfully`);
  } catch (error) {
    next(error);
  }
});

//Delete Todo
router.delete("/todos/:id", async (req, res, next) => {
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
    next(error);
  }
});

export default router;
