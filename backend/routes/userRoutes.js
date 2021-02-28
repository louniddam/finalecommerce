const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { hash } = require('bcrypt')

const userRouter = async function (router, con) {
    //Sign-up
    await router.post('/sign-up', function (req, res) {
        try {
            const name = req.body.name
            const email = req.body.email
            let pwd = req.body.pwd
            const img = req.body.img

            let verif = `SELECT email FROM users WHERE email = '${email}'`
            con.query(verif, (err, result) => {
                if (err) throw err
                if (result.length) {
                    res.status(200).send("This email already exists")
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
        const email = req.body.email
        const pwd = req.body.password
    
        let sql = `SELECT * FROM users WHERE email = '${email}'`
    
        con.query(sql, (err, result) => {
            if (err) throw err
    
            if (!result.length) {
                res.status(200).send("Email or password incorrect")
            } else {
                let token = jwt.sign({
                    name: result[0].name,
                    email: result[0].email,
                    img: result[0].image,
                    isAdmin: false,
                }, 'secret')
                bcrypt.compare(pwd, result[0].password).then(resp => {
                    if(resp === true){
                        res.status(200).send({token, auth: true})
                    } else{
                        res.status(200).send("Email or Password is incorrect");
                    }
                })
            }
        })
        } catch (error) {
            console.log(error);
        }
    })

    await router.put('/modify-profil' , (req, res) => {
        try {
            const previous = req.body.previous
            const pwd = req.body.password

            const sql = `SELECT * FROM users WHERE email = '${previous}'`
            //CHECK IF user exist
            con.query(sql , (error, result) => {
                if(error) throw error

                if(!result){
                    res.status(200).send(error)
                } else{
                    const check = `SELECT * FROM users WHERE email = '${req.body.email}'`
                    //CHECK IF new email already exist in DB
                    con.query(check, (e, r) => {
                        if (e) throw e
                        if(r.length) {
                            console.log(r);
                            res.status(200).send("Email already use")
                        } else {
                            console.log(r);
                            const sql2 = `UPDATE users SET ? WHERE ?`
                            bcrypt.hash(pwd, saltRounds).then(hash => {
                                const object = {
                                    name: req.body.name,
                                    email: req.body.email,
                                    image: req.body.image,
                                    password: hash,
                               }
                               const object2 = {
                                   email: req.body.previous
                               }
                               //OPERATE NEW changes
                               con.query(sql2, [object, object2], (err, resu) => {
                                    if (err) throw err
                                    if(resu) {
                                        console.log('profil updated');
                                        res.status(200).send(resu)
                                    } else {
                                        res.status(200).send('failed')
                                    }
                                })
                            })
                        }
                    })
                }
            }) 
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = userRouter