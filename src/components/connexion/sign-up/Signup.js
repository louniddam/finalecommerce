import axios from 'axios'
import React, { useState } from 'react'
import Header from '../../global/header/Header'
import '../sign-up/Signup.css'
import { useHistory } from 'react-router-dom'
import { userSignupSchema } from '../../../Validations/UserSignup'
import Footer from '../../global/footer/Footer'

const Signup = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [img, setImg] = useState('')
    const [message, setMessage] = useState('')
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
    }

    const formSubmit = async () => {
        let formValues = {
            name: pseudo,
            email: email,
            pwd: password,
            img: img,
        }

        const isValid = await userSignupSchema.isValid(formValues)
        if(isValid) {
            if(password === confirm) {
                axios.post('http://localhost:8000/sign-up', formValues)
                .then(resp => {
                    console.log(resp);
                    if(resp.data === 'New user registered'){
                        setMessage("New user registered")
                        history.push('/sign-in')
                    }
                })
                .catch(error => {
                    setMessage("Problème d'email ou de mot de passe")
                })
            } else if (password != confirm){
                setMessage("Les mots de passe ne correspondent pas")
            }
        } else {
            setMessage("Veuillez respecter le format indiqué par les champs")
        }
    }

    return (
        <>
        <Header />
        <div className="signup-container">
            <h1>Créer un compte</h1>
            <p>{message}</p>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label>Pseudo:</label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="4-10 lettres" required onChange={e => setPseudo(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="signEmail" name="email" placeholder="email@gmail.com" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" id="signPwd" name="password" placeholder="8 caractères min" required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Confirmation:</label>
                    <input type="password" id="confirmPwd" name="confirm" placeholder="confirmation" required onChange={e => setConfirm(e.target.value)}/>
                </div>
                <div>
                    <label>Ajouter un avatar</label>
                    <input type="text" id="avatar" name="avatar" placeholder="entrez une URL" required onChange={e => setImg(e.target.value)}/>
                </div>
                <div>
                    <button onClick={formSubmit}>créer</button>
                </div>
            </form>
            <br></br>
        </div>
        <Footer />
    </>
    )
}

export default Signup