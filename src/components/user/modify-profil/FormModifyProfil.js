import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../modify-profil/FormModifyProfil.css'
import Header from '../../global/header/Header'
import { signoutAction } from '../../../storeRedux/action/signoutAction'
//Input validation
import { modifyNameSchema } from '../../../Validations/modifyUser/ModifyName'
import { modifyEmailSchema } from '../../../Validations/modifyUser/ModifyEmail'
import { modifyPasswordSchema } from '../../../Validations/modifyUser/ModifyPassword'
import { modifyImageSchema } from '../../../Validations/modifyUser/ModifyImage'
import { connect } from 'react-redux';
const jwt = require('jsonwebtoken')


const FormModifyProfil = (props) => {
    const token = localStorage.getItem('token')
    const token_decoded = jwt.decode(token)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [validMessage, setValidMessage] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const disconnectAfterChange = () => {
        setErrorMessage('')
        document.getElementById("mdfy-form").reset();
        setTimeout(() => {
            props.signoutAction()
            props.history.push("/")
            localStorage.clear()
          }, 1500);
    }
    //Function for modify infos
    const handleNameChange = async () => {
        const formValue = {
            name: name,
            previous: token_decoded.email
        }

        const confirm = {
            name: name,
        }

        const isValid = await modifyNameSchema.isValid(confirm)
        if(isValid){
            axios.put(`http://localhost:8000/change-name`, formValue)
            .then(response => {
                setValidMessage("Pseudo mis à jour")
                disconnectAfterChange()
            })
            .catch(error => {
                console.log(error);
                console.log('not valid');
            })
        } else {
            setErrorMessage("Veuillez respecter le format indiqué par les champs")
        }
    }

    const handleEmailChange = async () => {
        const formValue = {
            email: email,
            previous: token_decoded.email,
        }

        const confirm = {
            email: email,
        }
        const isValid = await modifyEmailSchema.isValid(confirm)
        if(isValid){
            axios.put(`http://localhost:8000/change-email`, formValue)
            .then(response => {
                setValidMessage("Email mis à jour")
                disconnectAfterChange()
            })
            .catch(error => {
                console.log(error);
                console.log('not valid');
            })
        } else {
            setErrorMessage("Veuillez respecter le format indiqué par les champs")
        }
    }

    const handleImageChange = async () => {
        const formValue = {
            image: image,
            previous: token_decoded.email
        }
        const confirm = {
            image: image,
        }
        const isValid = await modifyImageSchema.isValid(confirm)
        if(isValid){
            axios.put(`http://localhost:8000/change-image`, formValue)
            .then(response => {
                setValidMessage("Image mise à jour")
                disconnectAfterChange()
            })
            .catch(error => {
                console.log(error);
                console.log('not valid');
            })
        } else {
            setErrorMessage("Veuillez respecter le format indiqué par les champs")
        }
    }
    

    const handlePasswordChange = async () => {
        const formValue = {
            password: password,
            previous: token_decoded.email
        }
        const confirm = {
            password: password,
        }
        const isValid = await modifyPasswordSchema.isValid(confirm)
        if(isValid){
            if(password === confirmation){
                axios.put(`http://localhost:8000/change-password`, formValue)
                .then(response => {
                    setValidMessage("Mot de passe mis à jour")
                    disconnectAfterChange()
                })
                .catch(error => {
                    console.log(error);
                    console.log('not valid');
                })
            } else {
                setErrorMessage("Les mots de passe de correspondent pas")
            }
        } else {
            setErrorMessage("Veuillez respecter le format indiqué par les champs")
        }
    }

    return(
        <>
        <Header />
        <div>
            <div className="modify-container">
                <h1>Modifier vos informations</h1>
                <h2>Après une modification vous serez déconnecté</h2>
                <p className="error-message">{errorMessage}</p>
                <p className="valid-message">{validMessage}</p>
                <form id="mdfy-form" onClick={handleFormSubmit}>
                    <div>
                        <label>Pseudo</label>
                        <input type="text" name="name" id="nameModify" placeholder="4-10 lettres" onChange={ e => setName(e.target.value)}/>
                        <button onClick={() => handleNameChange()}>Valider</button>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" id="emailModify" placeholder="email@gmail.com" onChange={ e => setEmail(e.target.value)}/>
                        <button onClick={() => handleEmailChange()}>Valider</button>
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="text" name="name" id="imageModify" placeholder="entrez une URL" onChange={ e => setImage(e.target.value)}/>
                        <button onClick={() => handleImageChange()}>Valider</button>
                    </div>
                    <div>
                        <label className="reduce">Nouveau mot de passe</label>
                        <input type="password" name="name" id="pwdModify" placeholder="4-10 caractères" onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label className="reduce">Confirmation mot de passe</label>
                        <input type="password" name="name" id="pwd2Modify" placeholder="confirmation" onChange={ e => setConfirmation(e.target.value)}/>
                        <button onClick={() => handlePasswordChange()}>Valider</button>
                    </div>
                </form>
                <br></br>
            </div>
        </div>
        </>
    )
}

const mapDispatchToProps = { signoutAction }

export default connect(null, mapDispatchToProps)(FormModifyProfil)