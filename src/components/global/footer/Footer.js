import React from 'react'
import '../footer/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {

    return(
        <div className="container-footer">
            <Link className='mentions-link' to='/mentions'>Mentions légales</Link>
            <p>contact: admin@gmail.com</p>
            <p>copyright</p>
        </div>
    )
}

export default Footer