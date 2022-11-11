import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";

import "./config/db.config.js";
import todoRoutes from "./routes/todo.routes.js";
import todoUsers from "./routes/user.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

import cors from "cors";
import handleError from "./error-handling/index.js";

const app = express();

app.use(cors());

app.use(logger("dev"));

app.use(express.json());

//Rota publica antes do middleware de autenticação
app.use("/", todoUsers);

//Middleware de autenticação
app.use(authMiddleware);

//Rotas
app.use("/", todoRoutes);

handleError(app);

//Listening
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
