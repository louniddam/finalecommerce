import React from 'react'
import { Route, Redirect } from "react-router-dom";
let jwt = require('jsonwebtoken')

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {

    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const token_decoded = jwt.decode(token)
    console.log(isAdmin);
    

    return(
        <Route {...rest} render={(props) => {
            if(token_decoded && isAdmin){
                return <Component {...props}/>
            } else {
                return <Redirect to={{ pathname: '/', state: { from: props.location }}}/>
            }
        }}/>
    )
}

export default ProtectedAdminRoute