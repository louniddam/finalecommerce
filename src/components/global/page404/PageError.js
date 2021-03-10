import React from 'react'
import '../page404/PageError.css'
import { Link } from "react-router-dom"

const PageError = (props) => {
    return(
        <div className="page-error-container">
            <h1>ERREUR 404 PAGE INTROUVABLE</h1>
            <img className="img-error" src="https://figurinepop.com/public/2021/03/50wanda1.jpg" />
            <br></br>
            <h2> <Link to='/' className='link-error'>Retour à l'accueil</Link></h2>
        </div>
    )
}

export default PageError