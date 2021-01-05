import axios from 'axios'
import React, { useState } from 'react'
import Header from '../header/Header'

const Signup = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [img, setImg] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
    }

    const formSubmit = () => {
        let formValues = {
            name: pseudo,
            email: email,
            pwd: password,
            img: img,
        }
        if(password === confirm) {
            axios.post('http://localhost:8000/sign-up', formValues)
            .then(resp => {
                console.log(resp);
                if(resp.data == 'New user registered'){
                    setMessage("New user registered")
                } else if(resp.data == 'This email already exists'){
                    setMessage("This email already exists, please pick an other")
                }
            })
        } else {
            setMessage("password confirmation is wrong")
        }
    }

    return (
        <>
        <Header />
        <div className="signup-container">
            <h1>Create your User</h1>
            <p>{message}</p>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label>Choose a pseudo</label>
                    <input type="text" id="pseudo" name="pseudo" required onChange={e => setPseudo(e.target.value)}/>
                </div>
                <div>
                    <label>Enter your email</label>
                    <input type="email" id="signEmail" name="email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Choose a password</label>
                    <input type="password" id="signPwd" name="password" required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Confirm your password</label>
                    <input type="password" id="confirmPwd" name="confirm" required onChange={e => setConfirm(e.target.value)}/>
                </div>
                <div>
                    <label>Add an avatar</label>
                    <input type="text" id="avatar" name="avatar" required onChange={e => setImg(e.target.value)}/>
                </div>
                <button onClick={formSubmit}>create user</button>
            </form>
        </div>
    </>
    )
}

export default Signup