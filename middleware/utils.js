const jwt = require("jsonwebtoken");

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

// const vvv = new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.SECRET, (err, res) => {
//         if (err) {
//             console.error("invalid token")
//             reject(err)
//         } else {
//             console.log(res)
//             resolve(res.iat)
//         }
//     })
// })