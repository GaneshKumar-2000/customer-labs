const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Destination = require("../controllers/destination/destination.controller");
const middleware = require("../middleware/utils")

router.post("/create",
    middleware.authenticate(),
    [
        check("url").notEmpty().withMessage("url is required"),
        check("http_method").notEmpty().withMessage("HTTP method name is required"),
        check("headers").notEmpty().withMessage("headers is required")
    ], (req, res) => {
        const error = validationResult(req).array()
        if (error.length) {
            var listMsg = []
            error.forEach((msg, i) => {
                listMsg.push({ [msg.path]: msg.msg })
            })
            res.status(400).json({ status: 400, message: "Values are required", result: listMsg })
        } else {
            Destination.create(req, (msg, code) => {
                if (code === 400) {
                    res.json({ status: code, message: msg })
                } else {
                    res.json({ status: code, message: msg })
                }
            })
        }
    }
)

router.get("/list",
    middleware.authenticate(),
    (req, res) => {
        Destination.list(req, (msg, code, data) => {
            if (code === 400) {
                res.json({ status: code, message: msg, result: data })
            } else {
                res.json({ status: code, message: msg, result: data })
            }
        })
    }
)

router.get("/list/:id",
    middleware.authenticate(),
    (req, res) => {
        Destination.list(req, (msg, code, data) => {
            if (code === 400) {
                res.json({ status: code, message: msg, result: data })
            } else {
                res.json({ status: code, message: msg, result: data })
            }
        })
    }
)

router.put("/update/:id",
    middleware.authenticate(),
    [
        check("url").notEmpty().withMessage("url is required"),
        check("http_method").notEmpty().withMessage("HTTP method name is required"),
        check("headers").notEmpty().withMessage("headers is required")
    ], (req, res) => {
        const error = validationResult(req).array()
        if (error.length) {
            var listMsg = []
            error.forEach((msg, i) => {
                listMsg.push({ [msg.path]: msg.msg })
            })
            res.status(400).json({ status: 400, message: "Values are required", result: listMsg })
        } else {
            Destination.update(req, (msg, code) => {
                if (code === 400) {
                    res.json({ status: code, message: msg })
                } else {
                    res.json({ status: code, message: msg })
                }
            })
        }
    }
)

router.delete("/delete/:id",
    middleware.authenticate(),
    (req, res) => {
        Destination.delete(req, (msg, code) => {
            if (code === 400) {
                res.json({ status: code, message: msg })
            } else {
                res.json({ status: code, message: msg })
            }
        })
    }
)

module.exports = router
