const server = require("../models/server.model")
const axios = require("axios")
const Destination = require("../models/destination/destination.model")

exports.sendDataToDestination = async (req, callBack) => {
    try {
        const token = req.headers['cl-x-token']
        await server.checkAccount(token, async (err, rows) => {
            if (err) {
                callBack("Error while fetching the list", 401, err)
            } else if (rows.length == 0) {
                callBack("Account does not exist", 404, [])
            } else {
                await Destination.accountDestinations(rows[0].account_id, async (err2, rows2) => {
                    if (err2) {
                        callBack("Error while fetching the destination details for the account", 401, err)
                    } else {
                        const data = req.body;
                        const destinations = []
                        rows2.forEach(destination => {
                            const headers = destination.headers
                            const method = destination.http_method.toUpperCase()
                            const url = destination.url
                            let response

                            destinations.push(new Promise(async (resolve, reject) => {
                                if (method == "GET") {
                                    const query = new URLSearchParams(data).toString();
                                    const url = `${destination.url}/?${query}`;
                                    response = await axios.get(url, { headers })
                                    resolve(response.data)
                                } else if (method == "POST" || method == "PUT") {
                                    await axios({
                                        url,
                                        method,
                                        headers,
                                        data
                                    })
                                    resolve(data)
                                }
                            }))
                        });

                        Promise.all(destinations)
                            .then((res) => {
                                callBack("Successfully sent data to all destinations", 200)
                            })
                            .catch((error) => {
                                callBack("Error while sending data to the destination", 400)
                            })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error, "Error from the server sending data to destination controller")
    }
}