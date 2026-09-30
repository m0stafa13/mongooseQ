import express from "express"
import { env } from "./config/config.service.js"
import { dbConnection } from "./database/connection.js"
let app = express()
app.use(express.json())

// connection 
dbConnection()


app.listen(env.port, () => {
    console.log(`express service is running in port ${env.port}`);
})
