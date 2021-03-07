import React from 'react'
import '../cart/UserCart.css'
import Header from '../../global/header/Header'
import { connect } from "react-redux";
// import emptyCartAction from '../../../storeRedux/action/emptyCartAction'
import deleteCartProductAction from '../../../storeRedux/action/deleteCartProductAction'
import increaseQuantityAction from '../../../storeRedux/action/increaseQuantityAction'
import modifyTotalPriceAction from '../../../storeRedux/action/modifyCartTotalPriceAction'
import axios from 'axios';
let jwt = require('jsonwebtoken')
const UserCart = (props) => {

    const cartProducts = props.cart.productCart
    const token = localStorage.getItem('token');
    const token_decoded = jwt.decode(token)
    console.log(token_decoded);

    const deleteProduct = (product) => {
        props.deleteCartProductAction(product.p.idproduct)
        props.increaseQuantityAction(product)
        props.modifyTotalPriceAction(product.p.price, product.qty)
    }

     const listCartProduct = cartProducts.map( product => {
        return(
            <div id='cart-card' key={product.p.idproduct}>
                <img src={product.p.image}/>
                <p id='product-name'>{product.p.name}</p>
                <p>quantité: {product.qty}</p>
                <p>prix unitaire: {product.p.price}€</p>
                <button onClick={() => deleteProduct(product)}>supprimer l'article</button>
            </div>
        )
    })

    const makeOrder = () => {
        let tab = []
        for(let i = 0; i < cartProducts.length; i++){
            tab.push({idproduct: cartProducts[i].p.idproduct, qty: cartProducts[i].qty})
        }
        let object = {
            iduser: token_decoded.id,
            products: tab,
            totalPrice: props.cart.totalPrice.toFixed(2),
        }
        axios.post(`http://localhost:8000/order-cart`, object)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
        <Header />
        <div id='main-cart-container'>
            <h1>Votre panier</h1>
            <div id='cart-container'>
                {cartProducts.length < 1 ? "votre panier est vide" : listCartProduct}
                <br></br>
                <p>prix total: {props.cart.totalPrice.toFixed(2)} €</p>
                <div className="cart-btn">
                    <button onClick={() => makeOrder()}>commander</button>
                    {/* <button onClick={() => emptyCart()}>vider le panier</button> */}
                </div>
                <br></br>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cartReducer
})

const mapDispatchToProps = {
    // emptyCartAction,
    deleteCartProductAction,
    increaseQuantityAction,
    modifyTotalPriceAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)