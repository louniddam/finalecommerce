import React from 'react';
import { connect } from "react-redux";
import "../header/Header.css"
import { signoutAction } from "../../../storeRedux/action/signoutAction"
import CategoryList from '../../category/category-list/CategoryList'
import { useHistory, Link } from "react-router-dom"

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
        <header className="header-container">
            {token ?            
            <nav className="nav-menu">
                <h1><Link to="/">Pop Ta Vie</Link></h1>
                    <ul className="nav-admin">
                        <li><Link to="/user-profil">Profil</Link></li>
                        {isAdmin ? <li><Link to="/add-product">Ajout de produit</Link></li>: <></>}
                        {!isAdmin ? <li><Link to="/cart">Panier</Link></li> : <></> }
                        <li><Link to="/" onClick={logOut}>Déconnexion</Link></li>
                    </ul>
            </nav> 
            : 
            <nav className="nav-menu">
                <h1><Link to="/">POP Ta VIE</Link></h1>
                <ul>
                    <li><Link to="/sign-in">Connexion</Link></li>
                    <li><Link to="/sign-up">Inscription</Link></li>
                </ul>
            </nav> 
            }
            <CategoryList />
            <br></br>
        </header>
    );
};

const mapDispatchToProps = { signoutAction }
const mapStateToProps = (state) => ({
    signinStore: state.signin,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Header);
