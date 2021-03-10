const verif_user = require('../middleware/token_user')
const verif_admin = require('../middleware/token_admin')

const productRouter = async function (router, con) {
    //----Create
    await router.post('/create-product', (req, res) => {
        try {
            let object = {
                 name: req.body.name,
                 title_desc: req.body.title,
                 description: req.body.description,
                 image: req.body.image,
                 price: req.body.price,
                 quantity: req.body.quantity,
                 category_affiliate: req.body.category,
            }

            let sql = `INSERT INTO products SET ?`

            con.query(sql, object,(err, result) => {
                if (err) throw err
                res.status(200).send("Product well added")
            })
        } catch (error) {
            console.log(error);
            res.status(403).send(error)
        }

    })

    //----GET ALL PRODUCT
    await router.get('/get-products', (req, res) => {
        try {
            const sql = `SELECT * FROM products`
            con.query(sql, (error, result) => {
                if (error) throw error
                res.status(200).send(result)
            })
        } catch (error) {

        }
    })

    //----GET SOLO PRODUCT
    await router.get('/get-product/:id',(req, res) => {
        try {
            const sql = `SELECT * FROM products WHERE idproduct = ?`
            const obj = {
                idproduct: req.params.id
            }
            con.query(sql, obj,(error, result) => {
                if (error) throw error
                res.status(200).send(result)
            })
        } catch (error) {
            console.log(error);
        }
    })

    //----MODIFY PRODUCT
    await router.put('/modify-product/:id', (req, res) => {
        try {
            let obj = {
                 name: req.body.name,
                 title_desc: req.body.title,
                 description: req.body.description,
                 image: req.body.image,
                 price: req.body.price,
                 quantity: req.body.quantity,
                 category_affiliate: req.body.category
            }

            let objID = {
                idproduct: req.params.id
            }

            let check = `SELECT * FROM products WHERE ?`
            const obj3 = {
                idproduct: req.params.id
            }
            con.query(check, obj3,(error, result) => {
                if (error) throw error
                if(result){
                    let sql = `UPDATE products SET ? WHERE ?`
                    con.query(sql, [obj, objID],(err, resu) => {
                        if (err) throw err
                        res.status(200).send(resu)
                    })
                } else {
                    res.status(403).send("no prudct found")
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
    
    //----DELETE A PRODUCT
    await router.post('/delete-product/:id',verif_admin, (req, res) => {
        try {
            //je verifie si le produit existe
            const sqlCheck = `SELECT * FROM products WHERE ?`
            const obj = {
                idproduct: req.params.id
            }
            con.query(sqlCheck, obj,(e, r) => {
                if(e) throw e
                if(r.length){
                    const sql = `DELETE FROM products WHERE ?`
                    con.query(sql, obj,(error, result) =>{
                        if (error) throw error
                        if(result){
                            res.status(200).send('product deleted')
                        } else {
                            res.status(403).send('no product found')
                        }
                    })
                } else {
                    res.status(403).send("product not found")
                }
            })
        } catch (error) {
            console.log(error);
        }
    })

    //Catagories
    //-----GET
    await router.get(`/categories`, (req, res) => {
        try {
            let sql = `SELECT * FROM categories`
            con.query(sql, (err, result) => {
                if (err) throw err
                res.status(200).send(result)
            })
        } catch (error) {
            res.status(403).send('something went wrong')
        }
    })

    //Categories
    //----GET BY ID
    await router.get('/categories/:id', (req, res) => {
    try {
        const sql = `SELECT * FROM categories WHERE ?`
        const obj = {
            idcategory: req.params.id
        }
        con.query(sql, obj,(err, result) => {
            if (err) throw err
            if (!result.length){
                res.status(403).send('No category found')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(error);
    }        
    })

    //Categories
    //-----GET PRODUCTS AFFILIATE
    await router.get('/category-products/:id', (req, res) => {
        try {
            const sql = `SELECT * FROM products WHERE ?`
            const obj = {
                category_affiliate: req.params.id
            }
            con.query(sql, obj,(err, result) => {
                if (err) throw err
                if (!result.length){
                    res.status(403).send('There are no products in this category yet')
                } else {
                    res.status(200).send(result)
                }
            })
        } catch (error) {
            console.log(error);
        }
    })

        //Lower qty after command
        await router.put('/change-qty', (req, res) => {
            try {
                let products = req.body
                let changeQty = `UPDATE products SET quantity = (quantity) - (${products.qty}) WHERE idproduct = ${products.idproduct}`
                con.query(changeQty, (error, result) => {
                    if (error) throw error
                    res.status(200).send("Quantity changed")
                })
            } catch (error) {
                res.status(403).send("An error as occured")
            }
        })

    //----GET COMMAND DETAILS
    await router.get(`/command-details/:id`, (req, res) => {
        try {

            let sql = 
            `SELECT object_command.quantity, products.name, products.price, products.image
             FROM object_command
             INNER JOIN products
             ON products.idproduct = object_command.id_product_affiliate
             WHERE object_command.id_cart_affiliate = ${req.params.id}`
            con.query(sql, (error, result) => {
                if (error) throw error
                if(result.length){
                    res.status(200).send(result)
                }
            })
            
        } catch (error) {
            console.log(error);
            res.status(403).send(`Can't get the details`)
        }
    })
}

module.exports = productRouter