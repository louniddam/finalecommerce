import React, { useEffect, useState } from 'react'
import '../user-commands/UserCommands.css'
import Header from '../../global/header/Header'
import axios from 'axios'
import Footer from '../../global/footer/Footer'
const jwt = require('jsonwebtoken')
const UserCommands = () => {
const token = localStorage.getItem('token');
const token_decoded = jwt.decode(token)
const iduser = token_decoded.id
let myCommands;
let sortedCommands;
let y;
const [initial, setInitial] = useState([])
const [arrayCommand, setArrayCommand] = useState([])


//Permet de trier mes objets et de créer des groupes
function groupBy(array, predicate) {
    const result = []
    for (const element of array) {
        let pushed = false
        for (const group of result) {
            if (predicate(group[0], element)) {
                group.push(element)
                pushed = true
                break
            }
        }
        if (!pushed) {
            result.push([element])
        }
    }
    return result
}

//Aller chercher les commandes
async function getCommands() {
    myCommands = await axios.get(`http://localhost:8000/get-commands/${iduser}`)
    setInitial(myCommands.data)
    if (myCommands.data.length > 1) {
        sortedCommands = groupBy(myCommands.data, (a, b) => a.date == b.date)
    }
    setArrayCommand(sortedCommands)
}

for(let i = 0; i < arrayCommand.length; i++){
    for(let j = 0; j < arrayCommand[i].length; j++){
         y = arrayCommand.slice([j])
    }
}

useEffect(() => {
    getCommands()
}, [])

console.log(initial, 'forme1');
console.log(arrayCommand, 'forme2');
console.log(y,'forme3');

    return(
        <>
            <Header />
            <h1 className='title-commands'>Vos commandes</h1>
            <div className='main-container-commands'>
                {/* {singleCommand} */}
            </div>
            <Footer />
        </>
    )
}

export default UserCommands