const AccountModel = require("../../models/account/account.model");

//Create account
exports.create = async (req, callBack) => {
    try {
        await AccountModel.create(req.body, (err, rows) => {
            if (err) {
                callBack(err, 400)
            } else {
                callBack("Successfully Created", 200)
            }
        })
    } catch (error) {
        console.error("Error from the create account controller", error)
    }
}

//List accounts or account
exports.list = async (req, callBack) => {
    try {
        await AccountModel.list(req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400, err)
            } else {
                callBack("Successfully fetched", 200, rows)
            }
        })
    } catch (error) {
        console.error("Error from the list account controller", error)
    }
}

//Update Account
exports.update = async (req, callBack) => {
    try {
        await AccountModel.update(req.body, req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400)
            } else {
                callBack("Successfully Updated", 200)
            }
        })
    } catch (error) {
        console.error("Error from the update account controller", error)
    }
}