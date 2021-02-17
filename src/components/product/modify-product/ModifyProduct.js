import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Header from '../../global/header/Header'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

async function fetchCategories(setCategory_data){
    const result = await axios.get(`http://localhost:8000/categories`)
    setCategory_data(result.data)
}
const ModifyProduct = (props) => {

    const params = new URLSearchParams(props.location.search)
    const urlId = params.get('id')
    const history = useHistory()


    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [category_data, setCategory_data] = useState([])
    const products = props.listOfProducts.products
    const [product, setProduct] = useState([])
    const getProduct = () =>{
        for(let i = 0; i < products.length; i++){
            if(products[i].idproduct == urlId){
                setProduct(products[i])
            }
        }
    }

    useEffect(() => {
        fetchCategories(setCategory_data)
        getProduct()
    }, [])

    const categories = category_data.map(category_data => {
        return(
            <>
                <option key={category_data.idcategory} value={category_data.name}>{category_data.name}</option>
            </>
        )
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }


    const formSubmit = () => {

        let category_affilliate = ''
            if (category.length) {
                for(let i = 0; i < category_data.length; i++){
                    if(category === category_data[i].name){
                        category_affilliate = category_data[i].idcategory
                        console.log(category_affilliate);
                    }
                }
            }
    
           const formValues = {
                name: name || product.name,
                title: title || product.title_desc,
                description: description || product.description,
                image: image || product.image,
                price: price || product.price,
                quantity: qty || product.quantity,
                category: category_affilliate,
            }

            console.log(formValues);
    
            axios.put(`http://localhost:8000/modify-product/${urlId}`, formValues)
            .then(resp => {
                console.log(resp);
                history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
        }

    return(
        <>
        <Header />
        <div>
            <h1>Modifier le produit</h1>
            <div>
                <form onClick={handleFormSubmit}>
                    <div>
                        <label>Nom du produit:</label>
                        <input type="text" name="prod-name" id="prod-name" placeholder={product.name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Image du produit:</label>
                        <input type="text" name="prod-img" id="prod-img" placeholder={product.image} onChange={e => setImage(e.target.value)}/>
                    </div>
                    <div>
                        <label>Titre de la description:</label>
                        <input type="text" name="prod-title" id="prod-title" placeholder={product.title_desc} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea  rows="5" cols="33" placeholder={product.description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Categorie:</label>
                        <select name="caegorie" id="categorie" onChange={e => setCategory(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                            {categories}
                        </select>
                    </div>
                    <div>
                        <label>Prix:</label>
                        <input type="number" name="prod-price" id="prod-price"  min="1"
                        step="0.1" placeholder={product.price} onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <div>
                        <label>Quantité:</label>
                        <input type="number" name="prod-qty" placeholder={product.quantity} id="ptod-qty" onChange={e => setQty(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={formSubmit}>modifier</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    listOfProducts: state.productsReducer
})


export default connect(mapStateToProps, null)(ModifyProduct)