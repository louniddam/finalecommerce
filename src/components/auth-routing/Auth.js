import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const AuthRoute = (props) => {
    const token = props.singinStore.userToken

    const isAuthentificated = () => {
        let isAuth = false
        if(token){
            isAuth = true
        } else{
            isAuth = false
        }
        console.log(isAuth);
        return(isAuth)
    }

    useEffect(() => {
        isAuthentificated()
    }, [])
    

    return null
}

// const mapDispatchToProps = { signinUserAction, signinAdminAction }
const mapStateToProps = (state) => ({
    singinStore : state.signin
})

export default connect(mapStateToProps, null)(AuthRoute)