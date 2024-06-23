const express = require("express")
const app = express()
require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 8080
const IndexRoutes = require("./routes/index")
const bodyParser = require("body-parser")
const cors = require("cors")
const router = require("express").Router()

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(
    cors({
        origin: "*",
        methods: "GET,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use("/", IndexRoutes)


app.get("/getlist", (req, res) => {
    res.send({ status: 200, result: [{ name: "ganesh" }, { name: "kumar" }, { name: "priya" }, { name: "dharshini" }, { name: "sharan" }, { name: "vishal" }] })
})

app.listen(PORT, () => {
    console.log(`Server started and running on the port : ${PORT}`)
})