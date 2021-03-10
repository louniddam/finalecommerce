require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminRouter = async function (router, con) {
    //----Sign-in
    await router.post(`${process.env.REACT_APP_ROUTE_AUTH}`, (req, res) => {
        try {
            let email = req.body.email
            let pwd = req.body.pwd

            let sql = `SELECT * FROM admin WHERE email = ?`
            con.query(sql, email, (error, result) => {
                if (error) throw error
                if (!result.length) {
                    res.status(403).send("Email or password incorrect")
                } else {
                    let token = jwt.sign({
                        name: result[0].name,
                        email: result[0].email,
                        isAdmin: true,
                    }, 'admin')
                    bcrypt.compare(pwd, result[0].password).then(resp => {
                        if (resp === true) {
                            res.status(200).send({
                                token,
                                auth: true
                            })
                        } else {
                            res.status(403).send("Email or password incorrect")
                        }
                    })
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    })
}

module.exports = adminRouter