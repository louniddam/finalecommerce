import React, { useEffect } from 'react'
import '../user-commands/UserCommands.css'
import Header from '../../global/header/Header'
import axios from 'axios'
const jwt = require('jsonwebtoken')

async function fetchCommands (id) {
    const result = await axios.get(`http://localhost:8000/get-commands/${id}`)
    console.log(result);
}

const UserCommands = () => {

    const token = localStorage.getItem('token');
    const token_decoded = jwt.decode(token)
    const iduser = token_decoded.id

    useEffect(() => {
        fetchCommands(iduser)
    }, [])

    return(
        <>
            <Header />
            <h1 className='title-commands'>Vos commandes</h1>
            <div className='main-container-commands'>

            </div>
        </>
    )
}

export default UserCommands