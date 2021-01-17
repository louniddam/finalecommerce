const verif_user = require('../middleware/token_user')
const verif_admin = require('../middleware/token_admin')

const productRouter = async function (router, con) {
    //----Create
    await router.post('/create-product', (req, res) => {
        try {
            let name = req.body.name
            let title = req.body.title
            let description = req.body.description
            let image = req.body.image
            let price = req.body.price
            let quantity = req.body.quantity
            let category = req.body.category

            let sql = `INSERT INTO products (name, title_desc, description, image, price, quantity, category_affiliate) VALUES ('${name}', '${title}', '${description}', '${image}', '${price}', '${quantity}', '${category}')`

            con.query(sql, (err, result) => {
                if (err) throw err
                res.status(200).send("Product well added")
            })
        } catch (error) {
            console.log(error);
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
    await router.get('/get-product/:id', (req, res) => {
        try {
            let id = req.params.id
            const sql = `SELECT * FROM products WHERE id = ${id}`
            con.query(sql, (error, result) => {
                if (error) throw error
                console.log(result);
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
            console.log(error);
        }
    })
}

module.exports = productRouter