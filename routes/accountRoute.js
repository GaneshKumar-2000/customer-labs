const router = require("express").Router();
const { check, param, validationResult } = require("express-validator");
const Account = require("../controllers/account/account.controller");

router.post("/create",
    // middleware.authenticate(),
    [
        check("email_id").notEmpty().withMessage("Email id is required"),
        check("account_name").notEmpty().withMessage("Account name is required")
    ], (req, res) => {
        const error = validationResult(req).array()
        if (error.length) {
            var listMsg = []
            error.forEach((msg, i) => {
                listMsg.push({ [msg.path]: msg.msg })
            })
            res.status(400).json({ status: 400, message: "Values are required", result: listMsg })
        } else {
            Account.create(req, (msg, code) => {
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
    // middleware.authenticate(),
    (req, res) => {
        Account.list(req, (msg, code, data) => {
            if (code === 400) {
                res.json({ status: code, message: msg, result: data })
            } else {
                res.json({ status: code, message: msg, result: data })
            }
        })
    }
)

router.get("/list/:id",
    // middleware.authenticate(),
    (req, res) => {
        Account.list(req, (msg, code, data) => {
            if (code === 400) {
                res.json({ status: code, message: msg, result: data })
            } else {
                res.json({ status: code, message: msg, result: data })
            }
        })
    }
)

router.put("/update/:id",
    // middleware.authenticate(),
    [
        check("account_name").notEmpty().withMessage("Account name is required")
    ], (req, res) => {
        const error = validationResult(req).array()
        if (error.length) {
            var listMsg = []
            error.forEach((msg, i) => {
                listMsg.push({ [msg.path]: msg.msg })
            })
            res.status(400).json({ status: 400, message: "Values are required", result: listMsg })
        } else {
            Account.update(req, (msg, code) => {
                if (code === 400) {
                    res.json({ status: code, message: msg })
                } else {
                    res.json({ status: code, message: msg })
                }
            })
        }
    }
)

router.put("/delete/:id",
    // middleware.authenticate(),
    (req, res) => {
        Account.update(req, (msg, code) => {
            if (code === 400) {
                res.json({ status: code, message: msg })
            } else {
                res.json({ status: code, message: msg })
            }
        })
    }
)

module.exports = router;