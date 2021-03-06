import './App.css';
import React, { useEffect } from 'react'
import Home from './components/global/home/Home'
import { connect } from "react-redux";
import storeProductsAction from './storeRedux/action/storeProductsAction'
import storeCategoryAction from './storeRedux/action/storeCategoryAction'
import axios from 'axios'

function App(props) {
  console.log("App rerendered " + Date.now())
  
  async function fetchProducts() {
    let products = await axios.get('http://localhost:8000/get-products')
    let category = await axios.get('http://Localhost:8000/categories')
    props.storeProductsAction(products.data)
    props.storeCategoryAction(category.data)
  }

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listOfProducts: state.productsReducer,
  categories: state.categoriesReducer,

})

const mapDispatchToProps = {
  storeProductsAction,
  storeCategoryAction,
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
