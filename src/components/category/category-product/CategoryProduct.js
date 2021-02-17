import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../global/header/Header'
import { useHistory } from "react-router-dom";
import '../category-product/CategoryProducts.css'
import { connect } from "react-redux";
const CategoryProduct = (props) => {

    const param = new URLSearchParams(props.location.search)
    let idCategoryURL = param.get('id')
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)
    const history = useHistory()
    const categories = props.categories.categories
    const productsStored = props.products.products

    const getData = () => {
        for(let i = 0; i < categories.length; i++){
            if(categories[i].idcategory == idCategoryURL){
                setCategory(categories[i])
            }
        }
        for(let i = 0; i < productsStored.length; i++){
            if(productsStored[i].category_affiliate == idCategoryURL){
                setProducts(products => [...products, productsStored[i]])
            }
        }
    }


    useEffect(() => {
        getData()
    }, [idCategoryURL])

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
               category != null && <img src={category.image}/> 
                }
            </div>
            <div className="products-container-2">
                {productsList}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categoriesReducer,
    products: state.productsReducer
})

export default connect(mapStateToProps, null)(CategoryProduct)