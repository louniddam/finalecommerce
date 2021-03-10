const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const {
    hash
} = require('bcrypt')

const userRouter = async function (router, con) {
    //Sign-up
    await router.post('/sign-up', function (req, res) {
        try {
            let pwd = req.body.pwd
            const obj = {
                email: req.body.email
            }
            let verif = `SELECT email FROM users WHERE ?`
            con.query(verif, obj, (err, result) => {
                if (err) throw err
                if (result.length) {
                    res.status(403).send('This email is uncorrect')
                } else {
                    bcrypt.hash(pwd, saltRounds).then(hash => {
                        let object = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            image: req.body.img,
                        }
                        let sql2 = `INSERT INTO users SET ?`
                        con.query(sql2, object, (error, resul) => {
                            if (error) throw error
                            res.status(200).send('New user registered')
                        })
                    })
                }
            })
        } catch (error) {
            console.log(error);
            res.status(403).send('An error as occured')
        }
    })

    //Sign-in
    await router.post('/sign-in', (req, res) => {
        try {
            let sql = `SELECT * FROM users WHERE  ?`
            const obj = {
                email: req.body.email
            }
            con.query(sql, obj, (err, result) => {
                if (err) throw err

                if (!result.length) {
                    res.status(403).send("Email or password incorrect")
                } else {
                    let token = jwt.sign({
                        name: result[0].name,
                        email: result[0].email,
                        img: result[0].image,
                        id: result[0].iduser,
                        isAdmin: false,
                    }, 'secret')
                    bcrypt.compare(req.body.password, result[0].password).then(resp => {
                        if (resp === true) {
                            res.status(200).send({
                                token,
                                auth: true
                            })
                        } else {
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
                if (result.length < 1) {
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
                        if (resul.affectedRows < 1) {
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
                if (result.length < 1) {
                    res.status(403).send(`This profil can't be modify`)
                } else {
                    const sql2 = `SELECT email FROM users WHERE ?`
                    const obj4 = {
                        email: req.body.email
                    }
                    con.query(sql2, obj4, (e, r) => {
                        if (e) throw e
                        if (r.length) {
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
                                if (resu.affectedRows < 1) {
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
                if (result.length < 1) {
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
                        if (resu.affectedRows < 1) {
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
                if (result.length < 1) {
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
                            if (resu.affectedRows < 1) {
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

    //Maker an order
    await router.post('/order-cart', (req, res) => {
        try {
            //Change format date
            let timeElapsed = Date.now();
            let today = new Date(timeElapsed);
            let date = today.toLocaleDateString();
            let obj = {
                total: req.body.totalPrice,
                date: date,
                user_affiliate: req.body.iduser
            }
            let sql = `INSERT INTO cart SET ? `
            con.query(sql, obj, (error, result) => {
                if (error) throw error
                if (result.affectedRows < 1) {
                    res.status(403).send('An error occured')
                } else {
                    //Product est un tableau d'objets que je dois transformer en tableau de tableaux
                    // exemple: [{idproduct: 12, quantity: 1}, {idproduct: 13, quantity: 1}]
                    let products = req.body.products
                    let tableau = []
                    //Ici on le transforme en tableau de tableaux pour respecter le format de la requete SQL
                    //exemple: [ [12, 1], [13, 1] ]
                    products.forEach(element => {
                        tableau.push(Object.values(element));
                    });
                    if (tableau.length) {
                        //Ici je rajoute l'ID du panier de ma requête précèdente avec result.insertId
                        tableau.forEach((element) => {
                            element.push(result.insertId);
                        });
                        //Chaques index de tableau correspond à mes colones de ma table
                        con.query(`INSERT INTO object_command (id_product_affiliate, quantity, id_cart_affiliate
                                ) VALUES ?`, [tableau, tableau[1], tableau[2]], async (e, r) => {
                            if (e) throw e
                            if (r.affectedRows < 1) {
                                res.status(403).send('An error occured')
                            } else {
                                // for(let i = 0; i < products; i++){
                                //     console.log("for");
                                // let changeQty = `UPDATE products SET quantity = ${products[i].qty} WHERE idproduct = ${products[i].idproduct}`
                                //     await con.query(changeQty, (er, re) => {
                                //         console.log("qty updated");
                                //     })
                                // console.log('ok');
                                // }
                            }
                            res.status(200).send('ok')
                        })
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    })

    //Get commands first try
    // await router.get('/get-commands/:id', (req, res) => {
    //     try {
    //         let iduser = req.params.id
    //         let obj = {
    //             user_affiliate: iduser
    //         }
    //         let sql = `SELECT cart.total, cart.date, object_command.quantity , products.name, products.image FROM cart INNER JOIN  object_command ON object_command.id_cart_affiliate = cart.idcart INNER JOIN products ON object_command.id_product_affiliate = products.idproduct WHERE cart.user_affiliate = ${iduser}`
    //         con.query(sql, obj, (err, result) => {
    //             if (err) throw err
    //             res.status(200).send(result)
    //         })
    //     } catch (error) {
    //         res.status(403).send(error)
    //     }
    // })

    //Get commands
    await router.get('/get-commands/:id', (req, res) => {
        try {
            let obj = {
                user_affiliate: req.params.id
            }
            let sql = `SELECT * FROM cart WHERE ?`
            con.query(sql, obj, (error, result) => {
                if (error) throw error
                if (result.length) {
                    res.status(200).send(result)
                } else {
                    res.status(403).send('Commandes introuvables')
                }
            })
        } catch (error) {
            res.status(403).send(error)
        }
    })
}

module.exports = userRouter