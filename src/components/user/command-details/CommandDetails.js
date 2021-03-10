import React, { useState, useEffect } from 'react'
import '../command-details/CommandDetails.css'
import Header from '../../global/header/Header'
import Footer from '../../global/footer/Footer'
import axios from 'axios'

const CommandDetails = (props) => { 
   const param = new URLSearchParams(props.location.search)
   const idCart = param.get('id')
   const [details, setDetails] = useState([])
   const [message, setMessage] = useState('')

   async function fetchProducts() {
       await axios.get(`http://localhost:8000/command-details/${idCart}`)
           .then(response => {
               setDetails(response.data)
               setMessage('')
           })
           .catch(error => {
            setMessage(`Une erreur c'est produite`)
           })
   }

   useEffect(() => {
       fetchProducts()
   }, [])
  
   const listProducts = details.map((elem, key) => {
       return(
        <div className='card-details' key={key}>
            <img src={elem.image} />
            <p>{elem.name}</p>
            <p>quantité: {elem.quantity}</p>
            <p>prix unitaire: {elem.price} €</p>
        </div>
       )
   })

    return(
        <>
        <Header />
        <div className='container-cards-details'>
            {listProducts}
        </div>
        <Footer />
        </>
    )
}

export default CommandDetails