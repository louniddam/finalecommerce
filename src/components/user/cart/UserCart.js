import React, { useEffect, useState } from 'react'
import '../cart/UserCart.css'
import Header from '../../global/header/Header'
import { connect } from "react-redux";
import emptyCartAction from '../../../storeRedux/action/emptyCartAction'
import deleteCartProductAction from '../../../storeRedux/action/deleteCartProductAction'

const UserCart = (props) => {
    const cartProducts = props.cart.productCart
     const listCartProduct = cartProducts.map( product => {
        return(
            <div id='cart-card' key={product.p.idproduct}>
                <img src={product.p.image}/>
                <p id='product-name'>{product.p.name}</p>
                <p>quantité: {product.qty}</p>
                <p>prix unitaire: {product.p.price}€</p>
                <button onClick={() => props.deleteCartProductAction(product.p.idproduct)}>supprimer l'article</button>
            </div>
        )
    })

    return (
        <>
        <Header />
        <div id='main-cart-container'>
            <h1>Votre panier</h1>
            <div id='cart-container'>
                {cartProducts.length < 1 ? "votre panier est vide" : listCartProduct}
                <div>
                    <button>commander</button>
                    <button onClick={() => props.emptyCartAction()}>vider le panier</button>
                </div>

            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cartReducer
})

const mapDispatchToProps = {
    emptyCartAction,
    deleteCartProductAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)