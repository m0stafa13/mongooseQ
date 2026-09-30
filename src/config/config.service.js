import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(`.env.${process.env.NODE_DEV}`) })

let port = process.env.PORT
const uri = process.env.URI

export const env = {
    port, uri
}

