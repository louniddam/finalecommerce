import signinReducer from './signinReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers( {
    signin: signinReducer,
})

export default allReducers