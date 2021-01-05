const jwt = require('jsonwebtoken')

const user_token = (req, res, next) => {
    let auth = req.headers["authorization"]

    jwt.verify(auth, 'secret', (err, result) => {
        if (err){
            res.status(200).send(err)
        } else if (result.length <= O){
            res.status(200).send(result)
        } else {
            next()
        }
    })
}

module.exports = user_token