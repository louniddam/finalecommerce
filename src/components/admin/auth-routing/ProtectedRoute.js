import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './Auth'
const ProtectedRoutes = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={
            (props) => {
                if (Auth.isAuthentificated()){
                    return <Component {...props} />
                } else {
                    <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}

export default ProtectedRoutes