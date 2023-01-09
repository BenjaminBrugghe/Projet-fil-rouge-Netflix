import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderLinks from './HeaderLinks';
import HeaderLinksAdmin from './HeaderLinksAdmin';

const HeaderLogged = (user) => {

    // L'utilisateur connecté
    const [currentUser, setCurrentuser] = useState(user);

    // Affichage des options utilisateurs/admins du Header
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showAdminOptions, setShowAdminOptions] = useState(false);

    // Affichage des informations de l'utilisateur connecté
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    // Pour afficher les options utilisateurs/admins du Header
    useState(() => {
        if (currentUser.user.admin == true) {
            setShowUserOptions(true);
            setShowAdminOptions(true);
        } else {
            setShowUserOptions(true);
        }
    }, []);

    /**
     * Ouvre ou ferme le menu "Mon compte"
    */
    const accountClick = () => {
        setShowAccountInfo(!showAccountInfo);
    };

    return (
        <div className='header'>
            <div className="headerLogo"></div>
            {showUserOptions && (<HeaderLinks />)}
            {showAdminOptions && (<HeaderLinksAdmin />)}
            <button className='headerAccountBtn' onClick={accountClick}>Mon compte</button>
            {showAccountInfo && (
                <div className='accountInfos'>
                    <p>{currentUser.user.firstname} {currentUser.user.lastname}</p>
                    <Link to='/userAccount' className='accountMenu'>Gérer mon compte</Link>
                    <Link to='/' className='accountMenu'>Me déconnecter</Link>
                </div>
            )}
        </div>
    );
};

export default HeaderLogged;
