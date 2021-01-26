import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../global/header/Header'
import { useHistory } from "react-router-dom";
import '../category-product/CategoryProducts.css'

async function fetchProducts (idAxios, setProducts) {
    const result_product = await axios.get(`http://localhost:8000/category-products/${idAxios}`)
    await setProducts(result_product.data)
}

async function fetchCategory (idAxios, setCategory) {
    const result_category = await axios.get(`http://localhost:8000/categories/${idAxios}`)
    await setCategory(result_category.data)
}

const CategoryProduct = (props) => {
    const param = new URLSearchParams(props.location.search)
    const idAxios = param.get('id')
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)
    const history = useHistory()


    useEffect(() => {
        async function multipleFetch(){
        await fetchProducts(idAxios, setProducts)
        await fetchCategory(idAxios, setCategory)
        }
        multipleFetch()
    }, [])

    console.log(products);
    const productsList = products.map(products => {
        return(
            <div className="products-cards" key={products.idproduct}>
                <img src={products.image}/>
                <p><span>{products.name}</span></p>
                <button className="btn-view-more" onClick={()=> history.push(`/single-product?id=${products.idproduct}`)
}>View more</button>
            </div>
        )
    })
    
    return(
        <div>
            <Header/>
            <div id='category-for-img'>
                {
               category != null && <img src={category[0].image}/> 
                }
            </div>
            <div className="products-container-2">
                {productsList}
            </div>
        </div>
    )
}

export default CategoryProduct