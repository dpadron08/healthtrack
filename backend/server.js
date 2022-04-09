import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = process.env.port

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => res.json({message: "Hello world!"}))

app.use("*", (req, res) => {
    res.status(404).json({error: "Not found!"})
})

app.listen(port)

export default app;