import express from "express";
import path from "path";
import mongoose from "mongoose";

import endpoints from "./endpoints.config";
import indexRouter from "./routes";

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URI);

const app: express.Express = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  );
});
