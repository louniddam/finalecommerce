import React, { useEffect, useState } from 'react';
import './SoloProduct.css'
import Header from '../../global/header/Header'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import removeProductAction from '../../../storeRedux/action/removeProductAction'
import axios from 'axios'

function SoloProduct(props) {
    //Get proper product by id in URL
    const param = new URLSearchParams(props.location.search)
    const urlId = param.get('id')

    const [productQty, setProductQty] = useState(0)
    const [product, setProduct] = useState([])
    const history = useHistory()

    //Get store informations
    const isAdmin = props.signinStore.userInfo.isAdmin
    const storedProducts = props.listOfProducts.products
    const soloProduct = () =>{
       for(let i = 0; i < storedProducts.length; i++ ) {
           if(storedProducts[i].idproduct == urlId){
                setProduct(storedProducts[i])
           } else{
                console.log("error");
           }
       }
    }

    useEffect(() => {
        soloProduct()
    },[urlId])

    //Modify quantity
   const increaseQty = () => {
        setProductQty(productQty + 1)
    }
   const decreaseQty = () => {
    setProductQty(productQty - 1)
    }

    const deleteProduct = () => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
          };
          
        axios.post(`http://localhost:8000/delete-product/${product.idproduct}`, null,{headers : headers})
        .then(result => {
            if(result.data == "product deleted"){
                props.removeProductAction(product.idproduct)
            } else {
                console.log("failed delet product");
            }
        })
    }

    return (
        <div className="solo-product">
            <Header/>
            <div className="solo-product-container">
                <img src={product.image}/>
                <span><p>{product.name}</p></span>
                <div className="data-product">
                    <p>{product.title_desc}</p>
                    <p>{product.description}</p>
                </div>
                <div className="info-product">
                    <p>{product.price}€</p>
                    <p>Quantité en stock: {product.quantity}</p>
                    <div className="qty-product">
                        <button onClick={() => decreaseQty()}>-</button>
                        <p>{productQty}</p>
                        <button onClick={() => increaseQty()}>+</button>
                    </div>
                    <div>
                        {isAdmin ?
                        <>
                            <button onClick={() => history.push(`/modify-product?id=${urlId}`)}>modifier</button>
                            <button onClick={() => {deleteProduct()}}>supprimer</button>
                        </>
                        :
                        <>
                            <button className="add-cart">Ajouter au panier</button>
                        </>
                        }
                    </div>
                </div>
            </div>
            <div className="space"></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    signinStore: state.signin,
    listOfProducts: state.productsReducer,
})

const mapDispatchToProps = {
    removeProductAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SoloProduct);