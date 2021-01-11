import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../product-list/ProductList.css'

async function fetchProducts(setProducts){
    let result = await axios.get('http://localhost:8000/get-products')
    setProducts(result.data)
}
const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts(setProducts)
    }, [])

    console.log(products);

    let allProducts = products.map(products => {
        return(
            <div className="products-cards" key={products.idproduct}>
                <img src={products.image}/>
                <p><span>{products.name}</span></p>
                <p>price: {products.price}$</p>
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

export default ProductList