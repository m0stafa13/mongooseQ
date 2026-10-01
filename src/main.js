import express from "express"
import { env } from "./config/config.service.js"
import { dbConnection } from "./database/connection.js"
import userRouter from "./module/user/user.controller.js"
// import noteRouter from "./module/Notes/note.controller.js"
let app = express()
app.use(express.json())
// connection 
dbConnection()
app.use("/auth", userRouter)
// app.use("/posts", noteRouter)

app.listen(env.port, () => {
    console.log(`express service is running in port ${env.port}`);
})
