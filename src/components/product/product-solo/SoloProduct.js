import React, { useEffect, useState } from 'react';
import './SoloProduct.css'
import Header from '../../global/header/Header'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import removeProductAction from '../../../storeRedux/action/removeProductAction'
import addToCartAction from '../../../storeRedux/action/addToCartAction'
import decreaseQuantityAction from '../../../storeRedux/action/decreaseQuantityAction'
import axios from 'axios'

function SoloProduct(props) {
    //Get proper product by id in URL
    const param = new URLSearchParams(props.location.search)
    const urlId = param.get('id')

    const [product, setProduct] = useState([])
    const [cartQty, setCartQty] = useState(0)
    const token = localStorage.getItem('token');

    const oldQty = product.quantity
    const history = useHistory()
    let newQty = oldQty - cartQty


    //Get store informations
    const isAdmin = props.signinStore.userInfo.isAdmin
    const storedProducts = props.listOfProducts.products
    const soloProduct = () =>{
       for(let i = 0; i < storedProducts.length; i++ ) {
           if(storedProducts[i].idproduct == urlId){
                setProduct(storedProducts[i])
           } else{
                // console.log("error");
           }
       }
    }

    const getCartQty = () => {
        for(let i = 0; i < props.cart.productCart.length; i++){
            if(props.cart.productCart[i].p.idproduct == urlId){
                setCartQty(props.cart.productCart[i].qty)
            } else {
                console.log('wtf');
            }
        }
    }


    useEffect(() => {
        soloProduct()
        getCartQty()
    },[urlId])
    
    const addToCart = (product) => {
        props.addToCartAction(product)
        props.decreaseQuantityAction(product)
        history.push('/cart')
    }

    //DELETE A PRODUCT STORE+BDD
    const deleteProduct = () => {
        const headers = {
            "Content-Type": "application/json",
            authorization: props.signinStore.userToken,
          };
          
        axios.post(`http://localhost:8000/delete-product/${product.idproduct}`, null,{headers : headers})
        .then(result => {
            if(result.data == "product deleted"){
                props.removeProductAction(product.idproduct)
                history.push('/')
            } else {
                console.log("failed delet product");
            }
        })
        .catch(error => {
            console.log('something went wrong');
        })
    }

    console.log(props);

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
                    {/* <div id="quantity-product">
                        <input id="typeinp" type="range" min="0" max={product.quantity} defaultValue="1" step="1" onChange={e => setProductQty(e.target.value)}/>
                        <p>{productQty}</p>
                    </div> */}
                    <div>
                        {isAdmin ?
                        <div className='adm-btn'>
                            <button className="add-cart" onClick={() => history.push(`/modify-product?id=${urlId}`)}>modifier</button>
                            <button  className="add-cart" onClick={() => {deleteProduct()}}>supprimer</button>
                        </div>
                        :
                        <>
                        {token ?
                            <>
                            {newQty < 1 ? 
                                "Ce produit n'est plus en stock" 
                                : 
                                <button className="add-cart" onClick={() => addToCart(product)}>Ajouter au panier</button>
                            }
                            </>
                            : 
                            <div></div>
                        }
                        </>
                        }
                    </div>
                    <br></br>
                </div>
            </div>
            <div className="space"></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    signinStore: state.signin,
    listOfProducts: state.productsReducer,
    cart: state.cartReducer
})

const mapDispatchToProps = {
    removeProductAction,
    addToCartAction,
    decreaseQuantityAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SoloProduct);