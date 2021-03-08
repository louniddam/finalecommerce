import './App.css';
import React, { useEffect } from 'react'
import Home from './components/global/home/Home'
import { connect } from "react-redux";
import storeProductsAction from './storeRedux/action/storeProductsAction'
import storeCategoryAction from './storeRedux/action/storeCategoryAction'
import axios from 'axios'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Signin from "../src/components/connexion/sign-in/Signin";
import Signup from "../src/components/connexion/sign-up/Signup";
import AdminAuth from "../src/components/admin/admin-auth/SigninAdmin";
import ProductForm from "../src/components/product/product-form/ProductForm";
import ProductList from "./components/product/product-list/ProductList";
import SoloProduct from './components/product/product-solo/SoloProduct';
import CategoryProduct from './components/category/category-product/CategoryProduct';
import UserProfil from './components/user/profil/UserProfil';
import ProtectedUserRoute from './components/global/protectRoutes/ProtectedUserRoute';
import ProtectedAdminRoute from './components/global/protectRoutes/ProtectedAdminRoute';
import ModifyProduct from './components/product/modify-product/ModifyProduct';
import FormModifyProfil from './components/user/modify-profil/FormModifyProfil';
import UserCart from './components/user/cart/UserCart'
import UserCommands from './components/user/user-commands/UserCommands'
import PageError from './components/global/page404/PageError'
import Mentions from './components/global/mentions legales/Mentions'

function App(props) {
  
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
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" component={Signin} />
        <Route path="/sign-up" component={Signup} />
        <Route path={process.env.REACT_APP_ROUTE_AUTH} component={AdminAuth} />
        <ProtectedAdminRoute path="/add-product" component={ProductForm} />
        <Route path="/allproducts" component={ProductList} />
        <Route path="/single-product" component={SoloProduct} />
        <Route path="/category-product" component={CategoryProduct} />
        <Route path="/mentions" component={Mentions} />
        <ProtectedUserRoute path="/user-profil" component={UserProfil} />
        <Route path="/modify-product" component={ModifyProduct}/>
        <ProtectedUserRoute path="/modify-profil" component={FormModifyProfil}/>
        <ProtectedUserRoute path="/cart" component={UserCart}/>
        <ProtectedUserRoute path="/user-commands" component={UserCommands}/>
        <Route path="*" component={PageError}/>
      </Switch>
    </Router>
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
