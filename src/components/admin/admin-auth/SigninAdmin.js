import React, { useState } from 'react'
import Header from '../../global/header/Header'
import jwt_decode from "jwt-decode"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import signinAdminAction from '../../../storeRedux/action/signinAdminAction'
import axios from 'axios'
require("dotenv").config();


const SigninAdmin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState()
    const history = useHistory()

    const formSubmit = (e) => {
        e.preventDefault()
        let formValues = {
            email: email,
            pwd: password,
        }
        axios.post(`http://localhost:8000${process.env.REACT_APP_ROUTE_AUTH}`, formValues)
        .then((resp) => {
            if(resp.data === "Email or password incorrect"){
                setIncorrect(true)
            } else if (resp.data.auth){
                let tokenDecoded = jwt_decode(resp.data.token)
                setIncorrect(false)
                props.signinAdminAction({tokenDecoded, token: resp.data.token})
                history.push("/")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return(
        <>
        <Header/>
        <div className="container-admin-auth">
            <form onSubmit={formSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" id="auth-email" name="auth-email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" id="auth-pwd" name="auth-pwd" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit">connexion</button>
            </form>
        </div>
        </>
    )
}

const mapDispatchToProps = { signinAdminAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps, mapDispatchToProps)(SigninAdmin)