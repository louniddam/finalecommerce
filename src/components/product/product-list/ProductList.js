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
                <p className="reduce">prix: {products.price} €</p>
                <p className="reduce">quantité: {products.quantity}</p>
                <button className="btn-view-more" onClick={()=> history.push(`/single-product?id=${products.idproduct}`)
}>Voir plus</button>
            </div>
        )
    })

    let lastProducts = allProducts.slice(-9)

     return(
         <>
         <br></br>
         <div className="wapper-txt">
            <div className="home-txt">
                <p className="txt-main">La référence des collectionneurs de tout âge de figurines Funko Pop. Les Funko Pop sont des figurines en plastique qui mesurent une dizaine de centimètres et commercialisées par la marque Funko. ... Ce modèle est utilisé pour des personnages impressionnants comme Hagrid dans la saga Harry Potter ou encore la Funko Pop de Maui, le demi-dieu du film d'animation Vaiana.</p>
            </div>
         </div>
         <p className="txt-main2">Nos derniers ajouts</p>
         <div className="products-container">
             {lastProducts}
         </div>
         </>
     )
}

const mapStateToProps = (state) => ({
    listOfProducts: state.productsReducer,
  })

export default connect(mapStateToProps, null)(ProductList)