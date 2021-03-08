import React from 'react'
import '../footer/Footer.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Footer = () => {
    const history = useHistory()
    return(
        <div className="container-footer">
            <Link className='mentions-link' onClick={() => history.push('/mentions')}>Mentions légales</Link>
            <p>contact: admin@gmail.com</p>
            <p>copyright</p>
        </div>
    )
}

export default Footer