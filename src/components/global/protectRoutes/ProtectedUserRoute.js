import React from 'react'
import { Route, Redirect } from "react-router-dom";
let jwt = require('jsonwebtoken')

const ProtectedUserRoute = ({ component: Component, ...rest }) => {

    const token = localStorage.getItem('token');
    const token_decoded = jwt.decode(token)
    
    return(
        <Route {...rest} render={(props) => {
            if(token_decoded){
                return <Component {...props}/>
            } else {
                return <Redirect to={{ pathname: '/', state: { from: props.location }}}/>
            }
        }}/>
    )
}

export default ProtectedUserRoute