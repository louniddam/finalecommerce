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
    
        let sql = `SELECT * FROM USERS WHERE email = '${email}'`
    
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
                        res.status(403).send("Email or Password is incorrect");
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