const router = require("express").Router();
const server = require("../controllers/server.controller");
const middleware = require("../middleware/utils")


router.post("/incoming_data",
    middleware.authenticate(),
    (req, res) => {
        if (typeof req.body !== 'object') {
            res.status(401).json({ status: 401, message: "Invalid Data" })
        } else {
            server.sendDataToDestination(req, (msg, code) => {
                if (code === 400) {
                    res.json({ status: code, message: msg })
                } else {
                    res.json({ status: code, message: msg })
                }
            })
        }
    }
)

module.exports = router