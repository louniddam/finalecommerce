import signinReducer from './signinReducer'
import productsReducer from './productsReducer'
import categoriesReducer from './categoriesReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers( {
    signin: signinReducer,
    productsReducer,
    categoriesReducer,
})

export default allReducers