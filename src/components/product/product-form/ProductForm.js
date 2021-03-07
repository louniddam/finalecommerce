import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../global/header/Header'
import '../product-form/ProductForm.css'
import { useHistory } from 'react-router-dom'
import { createProductSchema } from '../../../Validations/ProductForm'

async function fetchCategories(setCategory_data){
    const result = await axios.get(`http://localhost:8000/categories`)
    setCategory_data(result.data)
}
const ProductForm = () => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [category_data, setCategory_data] = useState([])
    const [errMess, setErrMess] = useState('')
    const history = useHistory()

    useEffect(() => {
        fetchCategories(setCategory_data)
    }, [])
    
    const categories = category_data.map(category_data => {
        return(
                <option key={category_data.idcategory} value={category_data.name}>{category_data.name}</option>
        )
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const formSubmit = async () => {

    let category_affilliate = ''
        if (category.length) {
            for(let i = 0; i < category_data.length; i++){
                if(category === category_data[i].name){
                    category_affilliate = category_data[i].idcategory
                }
            }
        }

       const formValues = {
            name: name,
            title: title,
            description: description,
            image: image,
            price: price,
            quantity: qty,
            category: category_affilliate,
        }

        const isValid = await createProductSchema.isValid(formValues)

        if(isValid) {
            setErrMess('')
            axios.post(`http://localhost:8000/create-product`, formValues)
            .then(resp => {
                history.push('/')
                window.location.reload()
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            setErrMess('Certains champs sont invalides')
        }
    }

    return(
        <>
        <Header />
        <div className="container-form-product">
            <h1>Ajouter un produit</h1>
            <p>{errMess}</p>
            <div className="sub">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Nom du produit:</label>
                        <input type="text" name="prod-name" id="prod-name" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Image du produit:</label>
                        <input type="text" name="prod-img" id="prod-img" onChange={e => setImage(e.target.value)}/>
                    </div>
                    <div>
                        <label>Titre de la description:</label>
                        <input type="text" name="prod-title" id="prod-title" onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea  rows="5" cols="33" onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Categorie:</label>
                        <select name="caegorie" id="categorie" onChange={e => setCategory(e.target.value)}>
                        <option value="">--Sélestionnez une option--</option>
                            {categories}
                        </select>
                    </div>
                    <div>
                        <label>Prix:</label>
                        <input type="number" name="prod-price" id="prod-price"  min="1"
                        step="0.01" onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <div>
                        <label>Quantité:</label>
                        <input type="number" name="prod-qty" id="ptod-qty" onChange={e => setQty(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={formSubmit}>ajouter</button>
                    </div>
                </form>
                <br></br>
                <br></br>
            </div>
        </div>
        </>
    )
}

export default ProductForm