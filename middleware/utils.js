const jwt = require("jsonwebtoken");
const db = require("../config/database")

exports.generateToken = async (data) => {
    try {
        const token = jwt.sign({ user: data }, process.env.SECRET)
        if (token) {
            return token
        } else {
            return false
        }
    } catch (err) {
        console.error(err, "Error from the token Genertion")
    }
}

exports.authenticate = () => {
    return (req, res, next) => {
        const token = req.headers['cl-x-token'];
        if (!token) {
            return res.json({ status: 400, message: "Invalid token" })
        } else {
            db.all(`SELECT * FROM accounts WHERE app_secret_token = ?`, [token], (err, rows) => {
                if (err) {
                    return res.status(500).json({ status: 500, message: "Internal server error" });
                } else if (rows.length === 0) {
                    return res.json({ status: 400, message: "Un Authenticate" })
                } else {
                    jwt.verify(token, process.env.SECRET, (err, rows) => {
                        if (err) {
                            console.error("invalid token")
                        } else {
                            req.logged_email = rows.user.email
                        }
                    })
                    next()
                }
            })
        }
    }
}