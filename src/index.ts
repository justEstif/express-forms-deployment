import express from "express"
import path from "path"
import mongoose from "mongoose"

import { config } from "./port-config"
import indexRouter from "./routes"

const MONGODB_URI =  "mongodb+srv://justEstif:justEstifpw123@cluster0.c5ompsq.mongodb.net/local_library?retryWrites=true&w=majority"

// Connect to MongoDB
mongoose.connect(MONGODB_URI)

const app: express.Express = express()
const port = config.server.port

// view engine setup
app.set("views", path.join(__dirname, "..", "views"))
app.set("view engine", "pug")

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", indexRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
