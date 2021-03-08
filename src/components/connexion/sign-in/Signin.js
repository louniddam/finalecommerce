import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from "react-redux";
import signinUserAction from '../../../storeRedux/action/signinUserAction'
import Header from '../../global/header/Header'
import { useHistory } from "react-router-dom";
import '../sign-in/Signin.css'
import { userSigninSchema } from '../../../Validations/UserSignin'
import Footer from '../../global/footer/Footer'


const Signin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [data, setData] = useState('')
    const history = useHistory()

    const formSubmit = async () => {
        let formValues = {
            email: email,
            password: password,
        }
        const isValid = await userSigninSchema.isValid(formValues)
        if(isValid){
            await axios.post('http://localhost:8000/sign-in', formValues)
            .then(response => {
                if (response.data.auth){
                    let tokenDecoded = jwt_decode(response.data.token)
                    props.signinUserAction({tokenDecoded, token: response.data.token})
                    localStorage.setItem('token', response.data.token);
                    history.push('/')
                }
            })
            .catch(error => {
                setClassName('is-wrong')
            })
        } else {
            setData("Les champs ne sont pas valides")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return(
        <>
        <Header />
        <div className="signin-container">
            <h1>Connexion</h1>
            <p className="error-message">{data}</p>
            <form  onSubmit={handleSubmit}>
                <div className="signin-email">
                    <label>Votre email</label>
                    <input type="email" name="email" id="email"  className={className} required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="signin-pwd">
                    <label>Votre mot de passe</label>
                    <input type="password" name="password" id="password" className={className} required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="signin-btn">
                    <button onClick={formSubmit}>connexion</button>
                </div>
            </form>
            <br></br>
        </div>
        <Footer />
        </>
    )
}

const mapDispatchToProps = { signinUserAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Signin)