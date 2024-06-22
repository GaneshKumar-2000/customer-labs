const sqlite3 = require("sqlite3").verbose()
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/mydb.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("Connected to the sqlite database")
    }
})

module.exports = db