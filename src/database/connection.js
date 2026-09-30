import mongoose from "mongoose"
import { env } from "../config/config.service.js"
export const dbConnection = async () => {
    const uri = env.uri

    await mongoose.connect(env.uri).then(() => {
        console.log("database connected successfully");
    }).catch((err) => {
        console.log("something went wrong to connect with db ", err);
    })
}


