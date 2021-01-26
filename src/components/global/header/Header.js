import React from 'react';
import { connect } from "react-redux";
import "../header/Header.css"
import { signoutAction } from "../../../storeRedux/action/signoutAction"
import CategoryList from '../../category/category-list/CategoryList'
import { useHistory } from "react-router-dom"

const Header = (props) => {

    const token = props.signinStore.userToken
    const isAdmin = props.signinStore.userInfo.isAdmin
    const history = useHistory()

    const logOut = () => {
        props.signoutAction()
        history.push("/")
        localStorage.clear()
    }

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
            <CategoryList />
        </div>
    );
};

const mapDispatchToProps = { signoutAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Header);