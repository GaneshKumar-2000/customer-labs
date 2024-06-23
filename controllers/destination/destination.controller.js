const DestinationModel = require("../../models/destination/destination.model")

//Create destination
exports.create = async (req, callBack) => {
    try {
        const email = req.logged_email
        await DestinationModel.create(req.body, email, (err, rows) => {
            if (err) {
                callBack(err, 400)
            } else {
                callBack("Successfully Created", 200)
            }
        })
    } catch (error) {
        console.error("Error from the create destination controller", error)
    }
}

//List destinations or destination
exports.list = async (req, callBack) => {
    try {
        await DestinationModel.list(req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400, err)
            } else {
                callBack("Successfully fetched", 200, rows)
            }
        })
    } catch (error) {
        console.error("Error from the list destination controller", error)
    }
}

//Update Account
exports.update = async (req, callBack) => {
    try {
        await DestinationModel.update(req.body, req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400)
            } else {
                callBack("Successfully Updated", 200)
            }
        })
    } catch (error) {
        console.error("Error from the update destination controller", error)
    }
}

//Delete Account
exports.delete = async (req, callBack) => {
    try {
        await DestinationModel.delete(req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400)
            } else {
                callBack("Successfully deleted", 200)
            }
        })
    } catch (error) {
        console.error("Error from the delete destination controller", error)
    }
}

//List all the destinations according to the account id
exports.accountDestinations = async (req, callBack) => {
    try {
        await DestinationModel.accountDestinations(req.params.id, (err, rows) => {
            if (err) {
                callBack(err, 400, err)
            } else {
                callBack("Successfully fetched", 200, rows)
            }
        })
    } catch (error) {
        console.error("Error from the list destination controller", error)
    }
}