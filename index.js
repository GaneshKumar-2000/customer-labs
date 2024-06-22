const express = require("express")
const app = express()
require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 8080
const IndexRoutes = require("./routes/index")
const bodyParser = require("body-parser")
const cors = require("cors")

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

app.listen(PORT, () => {
    console.log(`Server started and running on the port : ${PORT}`)
})