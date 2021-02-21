import signinReducer from './signinReducer'
import productsReducer from './productsReducer'
import categoriesReducer from './categoriesReducer'
import cartReducer from './cartReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers( {
    signin: signinReducer,
    productsReducer,
    categoriesReducer,
    cartReducer,
})

export default allReducers