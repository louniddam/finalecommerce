import React, { useEffect, useState } from 'react';
import './SoloProduct.css'
import axios from 'axios'
import Header from '../../global/header/Header'

async function fetchSingleProduct (idAxios, setProduct) {
    const response = await axios.get(`http://localhost:8000/get-product/${idAxios}`)
    setProduct(response.data[0])
    
}

function SoloProduct(props) {
    const param = new URLSearchParams(props.location.search)
    const idAxios = param.get('id')
    const [product, setProduct] = useState([])
    const [productQty, setProductQty] = useState(0)

    useEffect(() => {
        fetchSingleProduct(idAxios, setProduct)
    },[])

   const increaseQty = () => {
        setProductQty(productQty + 1)
   }

   const decreaseQty = () => {
    setProductQty(productQty - 1)
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
                <button className="add-cart">Ajouter au panier</button>
                </div>
            </div>
            <div className="space"></div>
        </div>
    );
}

export default SoloProduct;