import React, { useEffect, useState } from 'react'
import '../cart/UserCart.css'
import Header from '../../global/header/Header'
import { connect } from "react-redux";
import emptyCartAction from '../../../storeRedux/action/emptyCartAction'

const UserCart = (props) => {
    console.log(props);
    // let cartProducts = []
    // let listCartProduct = []
    const [message, setMessage] = useState("")

    //If nothing in store (empty cart) then map function throw error
    // const getInfosStore = () => {
    //     if(!props.cart.productCart) {
    //         setMessage("Votre panier est vide")
    //     } else {
    //         cartProducts = props.cart.productCart
    //         console.log(cartProducts);
    //          listCartProduct = cartProducts.map( product => {
    //             return(
    //                 <div id='cart-card' key={product.p.idproduct}>
    //                     <img src={product.p.image}/>
    //                     <p id='product-name'>{product.p.name}</p>
    //                     <p>quantité: {product.qty}</p>
    //                     <p>prix unitaire: {product.p.price}€</p>
    //                     <button>supprimer l'article</button>
    //                 </div>
    //             )
    //         })
    //     }
    // }

    const cartProducts = props.cart.productCart
    console.log(cartProducts);
     const listCartProduct = cartProducts.map( product => {
        return(
            <div id='cart-card' key={product.p.idproduct}>
                <img src={product.p.image}/>
                <p id='product-name'>{product.p.name}</p>
                <p>quantité: {product.qty}</p>
                <p>prix unitaire: {product.p.price}€</p>
                <button>supprimer l'article</button>
            </div>
        )
    })

    // useEffect(() => {
    //     getInfosStore()
    // }, [])

    return (
        <>
        <Header />
        <div id='main-cart-container'>
            <h1>Votre panier</h1>
            <div id='cart-container'>
                {listCartProduct}
                {
                    cartProducts ?
                    <div></div>
                    :
                    <div>
                        <button>commander</button>
                        <button onClick={() => props.emptyCartAction()}>vider le panier</button>
                    </div>
                }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)