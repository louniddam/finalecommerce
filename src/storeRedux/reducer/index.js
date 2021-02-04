import signinReducer from './signinReducer'
import productsReducer from './productsReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers( {
    signin: signinReducer,
    products: productsReducer,
})

export default allReducers