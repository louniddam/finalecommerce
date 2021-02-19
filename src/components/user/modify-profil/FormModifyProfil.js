import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../modify-profil/FormModifyProfil.css'
import Header from '../../global/header/Header'
const jwt = require('jsonwebtoken')

const FormModifyProfil = () => {
    const token = localStorage.getItem('token')
    const token_decoded = jwt.decode(token)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory()

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const formSubmit = () => {
        let formValues = {
            name: name,
            email: email,
            image: image,
            password: password,
            previous: token_decoded.email
        }
        if(password == confirmation){
           axios.put(`http://localhost:8000/modify-profil`, formValues)
           .then(resp => {
            localStorage.clear()
               history.push('/')
           })
        } else {
            setErrorMessage("Validation de mot de passe érronnée")
        }
    }

    return(
        <>
        <Header />
        <div>
            <div>
                <h1>Modifier vos informations</h1>
                <p className="error-message">{errorMessage}</p>
                <form onClick={handleFormSubmit}>
                    <div>
                        <label>Pseudo</label>
                        <input type="text" name="name" id="nameModify" onChange={ e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" id="emailModify" onChange={ e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="text" name="name" id="imageModify" onChange={ e => setImage(e.target.value)}/>
                    </div>
                    <div>
                        <label>Nouveaux mot de passe</label>
                        <input type="password" name="name" id="pwdModify" onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>Confirmation mot de passe</label>
                        <input type="password" name="name" id="pwd2Modify" onChange={ e => setConfirmation(e.target.value)}/>
                    </div>
                    <button onClick={() => formSubmit()}>ok</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default FormModifyProfil