import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import logger from "morgan";

import "./config/db.config.js";
import todoRoutes from "./routes/todo.routes.js";
import todoUsers from "./routes/user.routes.js";

import cors from "cors";

const app = express();

app.use(cors());

app.use(logger("dev"));

app.use(express.json());

//Rotas
app.use("/", todoRoutes);
app.use("/", todoUsers);

//Listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
