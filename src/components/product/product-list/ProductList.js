import React from 'react'
import './ProductList.css'
import { useHistory } from "react-router-dom"
import { connect } from "react-redux";


const ProductList = (props) => {

    const products = props.listOfProducts.products
    const history = useHistory()

    let allProducts = products.map(products => {
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
         <>
         <div className="products-container">
             {allProducts}
         </div>
         </>
     )
}

const mapStateToProps = (state) => ({
    listOfProducts: state.productsReducer,
  })

export default connect(mapStateToProps, null)(ProductList)