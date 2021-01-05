import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import signinUserAction from '../../storeRedux/action/signinUserAction'
import "../header/Header.css"

const Header = (props) => {

    const token = props.signinStore.userToken
    const logOut = () => {
        localStorage.clear()
    }

    return (
        <div className="header-container">
            {token ?            
            <nav className="nav-menu">
                <h1><a href="/">POP TA VIE</a></h1>
                <ul>
                    <li><a href="/profil">Profil</a></li>
                    <li><a href="/cart">Panier</a></li>
                    <li><a href="/" onClick={logOut}>Log-out</a></li>
                </ul>
            </nav> : 
                <nav className="nav-menu">
                <h1><a href="/">POP TA VIE</a></h1>
                <ul>
                    <li><a href="/sign-in">Sign-in</a></li>
                    <li><a href="/sign-up">Sign-up</a></li>
                </ul>
            </nav> 
            }
        </div>
    );
};

const mapDispatchToProps = { signinUserAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Header);
