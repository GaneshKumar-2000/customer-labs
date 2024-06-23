const db = require("../config/database")

exports.checkAccount = async (token, result) => {
    const sql = `SELECT * FROM accounts WHERE app_secret_token = ?`;
    db.all(sql, token, (err, rows) => {
        if (err) {
            result(err, null)
        } else {
            result(null, rows)
        }
    })
}