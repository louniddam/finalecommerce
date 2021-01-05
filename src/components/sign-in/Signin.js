import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from "react-redux";
import signinUserAction from '../../storeRedux/action/signinUserAction'
import Header from '../header/Header'
import { useHistory } from "react-router-dom";
// import { response } from 'express'

const Signin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userToken, setUserToken] = useState('')
    const [incorrect, setIncorrect] = useState()
    const history = useHistory()

    const formSubmit = async () => {
        let formValues = {
            email: email,
            password: password,
        }

        await axios.post('http://localhost:8000/sign-in', formValues)
        .then(response => {
            if (response.data === "Email or Password is incorrect"){
                setIncorrect(true)
            } else if (response.data.auth){
                let tokenDecoded = jwt_decode(response.data.token)
                setIncorrect(false)
                console.log("decoded",tokenDecoded);
                props.signinUserAction({tokenDecoded, token: response.data.token})
                history.push('/')
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <>
        <Header />
        <div className="signin-container">
            <form method="post" onSubmit={handleSubmit}>
                <div className="signin-email">
                    <label>Enter your email</label>
                    <input type="email" name="email" id="email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="signin-pwd">
                    <label>Enter your password</label>
                    <input type="password" name="password" id="password" required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="signin-btn">
                    <button onClick={formSubmit}>sign-in</button>
                </div>
            </form>
        </div>
        </>
    )
}

const mapDispatchToProps = { signinUserAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Signin)