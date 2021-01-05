const mysql = require("mysql2")
const { hash } = require('bcrypt')
const bcrypt = require('bcrypt')
const saltRounds = 10
require("dotenv").config();


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 8889,
    password: process.env.REACT_APP_DB_PWD,
    database: process.env.REACT_APP_DB_NAME,
    multipleStatements: true,
})

con.connect((err) => {
    if (err) throw err
    console.log("Database connected")
})

//Create Admin
const name = process.env.REACT_APP_ADMIN_NAME
const email = process.env.REACT_APP_ADMIN_EMAIL
const pwd = process.env.REACT_APP_ADMIN_PWD

const sql_admin = `CREATE TABLE IF NOT EXISTS admin (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(50), email VARCHAR(50) UNIQUE, password VARCHAR(100))`

con.query(sql_admin, (err, result) => {
    if (err) throw err
    if (result.length) {
        res.status(200).send('Email already in use')
    } else {
        bcrypt.hash(pwd, saltRounds).then( hash => {
            const sql = `INSERT IGNORE INTO admin (name, email, password) VALUES ('${name}', '${email}','${hash}')`

            con.query(sql, (err, res) => {
                if (err) throw err
            })
        })
    }
})

//Create tables
con.query(`
CREATE TABLE IF NOT EXISTS users (iduser INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(30), email VARCHAR(50), password VARCHAR(60), image TEXT(500));

CREATE TABLE IF NOT EXISTS categories (idcategory INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(50));

CREATE TABLE IF NOT EXISTS products (idproduct INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(50), title_desc VARCHAR(50), description TEXT(1000), image VARCHAR(500), price FLOAT, quantity INT, category_afiiliate INT, FOREIGN KEY (category_afiiliate) REFERENCES categories(idcategory));

CREATE TABLE IF NOT EXISTS cart (idcart INT PRIMARY KEY AUTO_INCREMENT NOT NULL, total FLOAT, date DATE,user_affiliate INT, FOREIGN KEY (user_affiliate) REFERENCES users(iduser));

CREATE TABLE IF NOT EXISTS object_command (idobject INT PRIMARY KEY AUTO_INCREMENT NOT NULL, quantity INT,id_product_affiliate INT, id_cart_affiliate INT, FOREIGN KEY (id_product_affiliate) REFERENCES products(idproduct), FOREIGN KEY (id_cart_affiliate) REFERENCES cart(idcart));
`)

module.exports = con
