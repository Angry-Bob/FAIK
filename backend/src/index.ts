import express from "express"
import { config } from "dotenv"
config()
const app = express()
app.use(express.json())
app.listen(5001, () => console.log('Your server is open!'))