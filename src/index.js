import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/gym.routes.js";
import { port } from "./config.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, console.log(`Servidor arriba en port ${port}`));
