const jwt = require('jsonwebtoken')

const token_admin = (req, res, next) => {
    let auth = req.headers["authorization"]

    jwt.verify(auth, "admin", (err, result) => {
        if (err){
            res.status(200).send(err)
        } else if (result.length <= 0) {
            res.status(200).send(result)
        } else {
            next()
        }
    })
}

module.exports = token_admin