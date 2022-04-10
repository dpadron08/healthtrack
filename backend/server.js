const express = require("express")
const cors = require("cors")
const { userRouter } = require("./routes/user.route.js")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = process.env.port

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => res.json({message: "Hello world!"}))

app.use("/api/users", userRouter)

app.use("*", (req, res) => {
    res.status(404).json({error: "Not found!"})
})

app.listen(port)
