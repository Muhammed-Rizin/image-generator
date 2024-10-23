import express from "express";
import logger from "morgan"
import cors from "cors";

import "dotenv/config";

import error from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import { PORT } from "./config/config.js";

import indexRouter from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", indexRouter);

app.use(error);
app.use(notFound);

app.listen(PORT, () => console.log("Server connected successfully"));
