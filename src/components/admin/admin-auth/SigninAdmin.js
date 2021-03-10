import React, { useState } from 'react'
import Header from '../../global/header/Header'
import '../admin-auth/SigninAdmin.css'
import jwt_decode from "jwt-decode"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import signinAdminAction from '../../../storeRedux/action/signinAdminAction'
import axios from 'axios'
import Footer from '../../global/footer/Footer'
require("dotenv").config();


const SigninAdmin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState('')
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
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('isAdmin', tokenDecoded.isAdmin);
                history.push("/")
            }
        })
        .catch((error) => {
            setIncorrect('Indentifiants incorrects')
        })
    }
    return(
        <>
        <Header/>
        <div className="container-admin-auth">
            <h1>Connexion</h1>
            <p className='error-message'>{incorrect}</p>
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
        <Footer />
        </>
    )
}

const mapDispatchToProps = { signinAdminAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps, mapDispatchToProps)(SigninAdmin)