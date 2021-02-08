import React, { useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../global/header/Header'
import '../profil/UserProfil.css'

const UserProfil = (props) => {

    const user_name = props.signinStore.userInfo.name
    const user_img = props.signinStore.userInfo.img
    const user_email = props.signinStore.userInfo.email

    console.log(props, "profil");

    return (
        <>
            <Header/>
            <div className="user-container">
                <div id="user-infos">
                    <div id='round'>
                        <img src={user_img}/>
                    </div>
                    <p>profil de {user_name}</p>
                    <p>email: {user_email}</p>
                    <div className="btn-profil">
                        <button>Voir mes commandes</button>
                        <button>Modifier mon profil</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    signinStore: state.signin,
})

export default connect(mapStateToProps, null)(UserProfil)