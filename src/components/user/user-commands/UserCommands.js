import React, { useEffect, useState } from 'react'
import '../user-commands/UserCommands.css'
import Header from '../../global/header/Header'
import axios from 'axios'
import Footer from '../../global/footer/Footer'
const jwt = require('jsonwebtoken')
const UserCommands = (props) => {
const token = localStorage.getItem('token');
const token_decoded = jwt.decode(token)
const iduser = token_decoded.id
const [commands, setCommands] = useState([])
const [message, setMessage] = useState('')

async function getCommands() {
    await axios.get(`http://localhost:8000/get-commands/${iduser}`)
        .then(response => {
            if (response) {
                setCommands(response.data)
                setMessage(``)

            }
        })
        .catch(error => {
            setMessage(`Vous n'avez pas effectué de commandes`)
        })
}

useEffect(() => {
    getCommands()
}, [])

console.log(commands);
const userCommands = commands.map((elem, key) => {
    return(
        <div className='command-card' key={key} onClick={() => props.history.push(`/command-details?id=${elem.idcart}`)}>
            <p>Voir le détail de la commande</p>
            <p>effectuée le: {elem.date}</p>
            <p>prix total: {elem.total} €</p>
        </div>
    )

})

    return(
        <>
            <Header />
            <h1 className='title-commands'>Vos commandes</h1>
            <p>{message}</p>
            <div className='main-container-commands'>
                {userCommands}
            </div>
            <Footer />
        </>
    )
}

export default UserCommands


//****************************************************** 
//Permet de trier mes objets et de créer des groupes
// function groupBy(array, predicate) {
//     const result = []
//     for (const element of array) {
//         let pushed = false
//         for (const group of result) {
//             if (predicate(group[0], element)) {
//                 group.push(element)
//                 pushed = true
//                 break
//             }
//         }
//         if (!pushed) {
//             result.push([element])
//         }
//     }
//     return result
// }

//Aller chercher les commandes
// async function getCommands() {
//     myCommands = await axios.get(`http://localhost:8000/get-commands/${iduser}`)
//     setInitial(myCommands.data)
//     if (myCommands.data.length > 1) {
//         sortedCommands = groupBy(myCommands.data, (a, b) => a.date == b.date)
//     }
//     setArrayCommand(sortedCommands)
// }
//****************************************************** 