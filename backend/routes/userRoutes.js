// const express = require("express")

// const userRouter = async function (router, con) {

//    await router.post('/sign-up', function (req, res) {

//         let name = req.body.name
//         let email = req.body.email
//         let pwd = req.body.pwd
//         let img = req.body.img
    
//         let verif = `SELECT email FROM users WHERE email = '${email}'`
//         con.query(verif, (err, result) =>{
//             if (err) throw err
//             if (result.length) {
//                 res.status(200).send("This email already exists")
//             } else {
//                 bcrypt.hash(pwd, saltRounds).then(hash => {
//                     let sql2 = `INSERT INTO users (name, email, password, image) VALUES('${name}', '${email}', '${hash}', '${img}')`
//                     con.query(sql2, (error, resul) => {
//                         if (error) throw error
//                         res.status(200).send('New user registered')
//                     })
//                 })
//             }
//         })
//     })}
 
// module.exports = userRouter