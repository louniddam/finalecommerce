import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ProductList.css'
import { useHistory } from "react-router-dom"

async function fetchProducts(setProducts){
    let result = await axios.get('http://localhost:8000/get-products')
    setProducts(result.data)
}
const ProductList = () => {
    const [products, setProducts] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetchProducts(setProducts)
    }, [])

    // const pushToSingle = () =>{
    //     history.push(`/single-product?id=${products.idproduct}`)
    // }
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

export default ProductList