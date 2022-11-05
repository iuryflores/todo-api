import express from "express";
import "./config/db.config.js";
import todoRoutes from "./routes/todo.routes.js";
import todoUsers from "./routes/user.routes.js";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

//Rotas
app.use("/", todoRoutes);
app.use("/", todoUsers);

//Listening
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000 port`);
});
