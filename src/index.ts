import express from "express"
import path from "path"
import mongoose from "mongoose"
import favicon from "serve-favicon"

import endpoints from "./endpoints.config"
import indexRouter from "./routes"
import catalogRouter from "./routes/catalog"

// Connect to MongoDB
mongoose.connect(endpoints.MONGO_URL)

const app: express.Express = express()

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

// serve favico
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")))

app.use("/", indexRouter)
app.use("/catalog", catalogRouter)

app.listen(endpoints.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${endpoints.PORT}`
  )
})
