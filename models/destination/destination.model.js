const db = require("../../config/database")
const AccountModel = require("../account/account.model")

exports.create = async (data, email, result) => {
    try {
        await AccountModel.getAccountId(email, (err, id) => {
            if (err) {
                console.error(err, "error while fetching the account id")
            } else {
                db.serialize(() => {
                    db.run('CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY, url VARCHAR(255) NOT NULL, http_method VARCHAR(255) NOT NULL, headers TEXT NOT NULL, account_id INTEGER NOT NULL)', async (err) => {
                        if (err) {
                            console.error(err)
                        } else {
                            db.run('INSERT INTO destinations (url, http_method, headers, account_id) VALUES (?, ?, ?, ?)', [data.url, data.http_method, data.headers, id.id], (err) => {
                                if (err) {
                                    console.error(err, "error from the insert destination")
                                } else {
                                    result(null, true)
                                }
                            });
                        }
                    });
                })
            }
        })

    } catch (error) {
        console.error("Error from the create destination model", error)
    }
}

exports.list = async (id, email, result) => {
    try {
        await AccountModel.getAccountId(email, (err, rows) => {
            if (err) {
                console.error(err)
            } else {
                const sql = id ? `SELECT url, http_method, headers FROM destinations WHERE id = ${id}` : `SELECT id,url, http_method, headers FROM destinations WHERE account_id = ${rows.id}`;
                db.all(sql, (err2, rows2) => {
                    if (err2) {
                        result("Error while fetching the account list", null)
                    } else {
                        result(null, id ? rows2[0] : rows2)
                    }
                })
            }
        })

    } catch (error) {
        console.log(error, "Error from the list destination model")
    }
}

exports.update = async (data, id, result) => {
    try {
        const sql = `UPDATE destinations SET url = ?, http_method = ?, headers = ? WHERE id = ?`;
        db.run(sql, [data.url, data.http_method, data.headers, id], (err) => {
            if (err) {
                console.error(err)
                result("Error while updating the record", null)
            } else {
                result(null, true)
            }
        })
    } catch (error) {
        console.error(error, "Error from the update destination model")
    }
}

exports.delete = async (id, result) => {
    try {
        const sql = `DELETE FROM destinations WHERE id = ?`
        db.run(sql, [id], (err) => {
            if (err) {
                result(err, null)
            } else {
                result(null, true)
            }
        })
    } catch (error) {
        console.error(error)
    }
}