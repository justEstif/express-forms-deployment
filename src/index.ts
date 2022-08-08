import express from "express"
import path from "path"
import mongoose from "mongoose"

import endpoints from "./endpoints.config"
import indexRouter from "./routes"
import catalogRouter from "./routes/catalog"

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URL)

const app: express.Express = express()

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

app.use("/", indexRouter)
app.use("/catalog", catalogRouter)

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  )
})
