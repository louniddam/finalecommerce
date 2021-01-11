import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
// import signinUserAction from '../../storeRedux/action/signinUserAction'
// import signinAdminAction from '../../storeRedux/action/signinAdminAction'
import "../header/Header.css"

const Header = (props) => {

    const token = props.signinStore.userToken
    const isAdmin = props.signinStore.userInfo.isAdmin
    const logOut = () => {
        localStorage.clear()
    }

    console.log(props);

    return (
        <div className="header-container">
            {token ?            
            <nav className="nav-menu">
                <h1><a href="/">POP TA VIE</a></h1>
                {isAdmin ?
                    <>
                        <li><a href="/profil">Profil</a></li>
                        <li><a href="/cart">Panier</a></li>
                        <li><a href="/add-product">Ajout de produit</a></li>
                        <li><a href="/" onClick={logOut}>Déconnexion</a></li> 
                    </>
                    :
                    <>
                        <li><a href="/profil">Profil</a></li>
                        <li><a href="/cart">Panier</a></li>
                        <li><a href="/" onClick={logOut}>Déconnexion</a></li>
                    </>
                    }
            </nav> : 
                <nav className="nav-menu">
                <h1><a href="/">POP TA VIE</a></h1>
                <ul>
                    <li><a href="/sign-in">Connexion</a></li>
                    <li><a href="/sign-up">Inscription</a></li>
                </ul>
            </nav> 
            }
        </div>
    );
};

// const mapDispatchToProps = { signinUserAction, signinAdminAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,null)(Header);
