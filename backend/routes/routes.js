// const express = require("express")
// const router = express.Router()
// const con = require("../database/database")
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const saltRounds = 10
// require("dotenv").config();
// //middlewares
// const verif_user = require('../middleware/token_user')
// const verif_admin = require('../middleware/token_admin')


// //USER
// //----Sign-up
// router.post('/sign-up', (req, res) => {
//     try {
//     let name = req.body.name
//     let email = req.body.email
//     let pwd = req.body.pwd
//     let img = req.body.img

//     let verif = `SELECT email FROM users WHERE email = '${email}'`
//     con.query(verif, (err, result) =>{
//         if (err) throw err
//         if (result.length) {
//             res.status(200).send("This email already exists")
//         } else {
//             bcrypt.hash(pwd, saltRounds).then(hash => {
//                 let sql2 = `INSERT INTO users (name, email, password, image) VALUES('${name}', '${email}', '${hash}', '${img}')`
//                 con.query(sql2, (error, resul) => {
//                     if (error) throw error
//                     res.status(200).send('New user registered')
//                 })
//             })
//         }
//     })
//     } catch (error) {
//         console.log(error);
//     }
// })
// //----Sign-in
// router.post('/sign-in', (req,res) => {
//     try {
//         let email = req.body.email
//     let pwd = req.body.password

//     let sql = `SELECT * FROM USERS WHERE email = '${email}'`

//     con.query(sql, (err, result) => {
//         if (err) throw err

//         if (!result.length) {
//             res.status(200).send("Email or password incorrect")
//         } else {
//             let token = jwt.sign({
//                 name: result[0].name,
//                 email: result[0].email,
//                 img: result[0].image,
//                 isAdmin: false,
//             }, 'secret')
//             bcrypt.compare(pwd, result[0].password).then(resp => {
//                 if(resp === true){
//                     res.status(200).send({token, auth: true})
//                 } else{
//                     res.status(200).send("Email or Password is incorrect");
//                 }
//             })
//         }
//     })
//     } catch (error) {
//         console.log(error);
//     }
// })

// //ADMIN
// //----Sign-in
// router.post(`${process.env.REACT_APP_ROUTE_AUTH}`, (req, res) => {
//    try {
//     let email = req.body.email
//     let pwd = req.body.pwd

//     let sql = `SELECT * FROM admin WHERE email = '${email}'`
//     con.query(sql, (error, result) =>{
//         if (error) throw error
//         if (!result.length){
//             res.status(200).send("Email or password incorrect")
//         } else {
//             let token = jwt.sign({
//                 name: result[0].name,
//                 email: result[0].email,
//                 isAdmin: true,
//             }, 'admin')
//             bcrypt.compare(pwd, result[0].password).then(resp => {
//                 if (resp === true){
//                     res.status(200).send({token, auth: true})
//                 } else {
//                     res.status(200).send("Email or password incorrect")
//                 }
//             })   
//         }
//     })
//    } catch (error) {
//        res.status(203).send(error)
//    }
// })

// //PRODUCT
// //----Create
// router.post('/create-product', (req, res) => {
//     try {
//         let name = req.body.name
//         let title = req.body.title
//         let description = req.body.description
//         let image = req.body.image
//         let price = req.body.price
//         let quantity = req.body.quantity
//         let category = req.body.category
    
//         let sql = `INSERT INTO products (name, title_desc, description, image, price, quantity, category_affiliate) VALUES ('${name}', '${title}', '${description}', '${image}', '${price}', '${quantity}', '${category}')`
    
//         con.query(sql, (err, result) => {
//             if (err) throw err
//             res.status(200).send("Product well added")
//         })
//     } catch (error) {
//         console.log(error);
//     }

// })
// //----GET ALL PRODUCT
// router.get('/get-products', (req, res) => {
//     try {
//         const sql = `SELECT * FROM products`
//         con.query(sql, (error, result) => {
//             if (error) throw error
//             res.status(200).send(result)
//         })
//     } catch (error) {
        
//     }
// })

// //----GET SOLO PRODUCT
// router.get('/get-product/:id', (req, res) => {
//     try {
//         let id = req.params.id
//         const sql = `SELECT * FROM products WHERE id = ${id}`
//         con.query(sql, (error, result) => {
//             if (error) throw error
//             console.log(result);
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// //Catagories
// //-----GET
// router.get(`/categories`, (req,res) => {
//     try {
//         let sql = `SELECT * FROM categories`
//         con.query(sql, (err, result) => {
//             if (err) throw err
//             res.status(200).send(result)
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// module.exports = router