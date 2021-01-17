import React from 'react'
import CategoryList from '../category-list/CategoryList'
import Header from '../header/Header'
import ProductList from '../product-list/ProductList'

const Home = () => {
    
    return(
        <>
        <Header />
        <CategoryList />
        <ProductList />
        </>
    )
}

export default Home