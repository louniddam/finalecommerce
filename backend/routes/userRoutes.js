const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { hash } = require('bcrypt')

const userRouter = async function (router, con) {
    //Sign-up
    await router.post('/sign-up', function (req, res) {
        try {
            let pwd = req.body.pwd

            let verif = `SELECT email FROM users WHERE ?`
            const obj = {
                email: req.body.email
            }
            con.query(verif, obj,(err, result) => {
                if (err) throw err
                if (result.length) {
                    res.status(403).send()
                } else {
                    bcrypt.hash(pwd, saltRounds).then(hash => {
                        let object = {
                             name: req.body.name,
                             email: req.body.email,
                             password: hash,
                             image: req.body.img,
                        }
                        let sql2 = `INSERT INTO users SET ?`
                        con.query(sql2, object,(error, resul) => {
                            if (error) throw error
                            res.status(200).send('New user registered')
                        })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    })

    //Sign-in
    await router.post('/sign-in', (req,res) => {
        try {
        let sql = `SELECT * FROM users WHERE  ?`
        const obj = {
            email: req.body.email
        }
        con.query(sql, obj,(err, result) => {
            if (err) throw err
    
            if (!result.length) {
                res.status(403).send("Email or password incorrect")
            } else {
                let token = jwt.sign({
                    name: result[0].name,
                    email: result[0].email,
                    img: result[0].image,
                    isAdmin: false,
                }, 'secret')
                bcrypt.compare(req.body.password, result[0].password).then(resp => {
                    if(resp === true){
                        res.status(200).send({token, auth: true})
                    } else{
                        res.status(403).send("Email or Password is incorrect");
                    }
                })
            }
        })
        } catch (error) {
            console.log(error);
        }
    })


    //Modify profil -- name
    await router.put('/change-name', (req, res) => {
        try {
            const sql = `SELECT * FROM users WHERE ?`
            const obj = {
                email: req.body.previous
            }
            con.query(sql, obj, (error, result) => {
                if (error) throw error
                if(result.length < 1){
                    res.status(403).send(`This profil can't be modify`)
                } else {
                    const sql2 = `UPDATE users SET ? WHERE ?`
                    const obj1 = {
                        name: req.body.name,
                    }
                    const obj2 = {
                        email: req.body.previous,
                    }
                    con.query(sql2, [obj1, obj2], (err, resul) => {
                        if (err) throw err
                        if(resul.affectedRows < 1){
                            res.status(403).send("update impossible")
                        } else {
                            res.status(200).send("Name updated")
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
    //Modify profil -- email
    await router.put('/change-email', (req, res) => {
        try {
            const sql = `SELECT * FROM users WHERE ?`
            const obj = {
                email: req.body.previous
            }
            con.query(sql, obj, (error, result) => {
                if (error) throw error
                if(result.length < 1) {
                    res.status(403).send(`This profil can't be modify`)
                } else {
                    const sql2 = `SELECT email FROM users WHERE ?`
                    const obj4 = {
                        email: req.body.email
                    }
                    con.query(sql2, obj4, (e, r) => {
                        if (e) throw e
                        if(r.length) {
                            res.status(403).send(`Une erreur c'est produite`)
                        } else {
                            const sql3 = `UPDATE users SET ? WHERE ?`
                            const obj1 = {
                                email: req.body.email
                            }
                            const obj2 = {
                                email: req.body.previous
                            }
                            con.query(sql3, [obj1, obj2], (err, resu) => {
                                if (err) throw err
                                if(resu.affectedRows < 1){
                                    res.status(403).send("update impossible")
                                } else {
                                    res.status(200).send("Email updated")
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
    //Modify profil image
    await router.put('/change-image', (req, res) => {
        try {
            const sql = `SELECT * FROM users WHERE email = ?`
            con.query(sql, req.body.previous, (error, result) => {
                if (error) throw error
                if(result.length < 1) {
                    res.status(403).send(`This profil can't be modify`)
                } else {
                    const sql2 = `UPDATE users SET ? WHERE ?`
                    const obj1 = {
                        image: req.body.image
                    }
                    const obj2 = {
                        email: req.body.previous
                    }
                    con.query(sql2, [obj1, obj2], (err, resu) => {
                        if (err) throw err
                        if(resu.affectedRows < 1){
                            res.status(403).send("update impossible")
                        } else {
                            res.status(200).send("Avatar updated")
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    })

        //Modify profil password
        await router.put('/change-password', (req, res) => {
            try {
                const sql = `SELECT * FROM users WHERE email = ?`
                con.query(sql, req.body.previous, (error, result) => {
                    if (error) throw error
                    if(result.length < 1) {
                        res.status(403).send(`This profil can't be modify`)
                    } else {
                        bcrypt.hash(req.body.password, saltRounds).then(hash => {
                            const sql2 = `UPDATE users SET ? WHERE ?`
                            const obj1 = {
                                password: hash
                            }
                            const obj2 = {
                                email: req.body.previous
                            }
                            con.query(sql2, [obj1, obj2], (err, resu) => {
                                if (err) throw err
                                if(resu.affectedRows < 1){
                                    res.status(403).send("update impossible")
                                } else {
                                    res.status(200).send("Password updated")
                                }
                            })
                        })
                    }
                })
            } catch (error) {
                console.log(error);
            }
        })
}

module.exports = userRouter