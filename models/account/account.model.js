const middleware = require("../../middleware/utils")
const db = require("../../config/database")


exports.create = async (data, result) => {
    try {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS accounts (account_id INTEGER PRIMARY KEY, account_name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, app_secret_token TEXT NOT NULL)', async (err) => {
                if (err) {
                    console.error(err)
                } else {
                    const token = await middleware.generateToken({ email: data.email })
                    db.run('INSERT INTO accounts (account_name, email, app_secret_token) VALUES (?, ?, ?)', [data.account_name, data.email_id, token], (err) => {
                        if (err) {
                            console.error(err)
                            if (err.errno === 19) {
                                result("This email id already exists", null)
                            }
                        } else {
                            result(null, true)
                        }
                    });
                }
            });
        })
    } catch (error) {
        console.error("Error from the create account model", error)
    }
}

exports.list = async (id, result) => {
    try {
        const sql = id ? `SELECT account_id, account_name, email FROM accounts WHERE account_id = ${id}` : `SELECT account_id, account_name, email FROM accounts`;
        db.all(sql, (err, rows) => {
            if (err) {
                result("Error while fetching the account list", null)
            } else {
                result(null, id ? rows[0] : rows)
            }
        })
    } catch (error) {
        console.log(error, "Error from the list account model")
    }
}

exports.update = async (data, id, result) => {
    try {
        const sql = `UPDATE accounts SET account_name = ? WHERE account_id = ?`;
        db.run(sql, [data.account_name, id], (err) => {
            if (err) {
                if (err.errno === 19) {
                    result("This email id already exists", null)
                } else {
                    result("Error while updating the record", null)
                }
            } else {
                result(null, true)
            }
        })
    } catch (error) {
        console.error(error, "Error from the update account model")
    }
}