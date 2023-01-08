import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { getAllUsers } from '../service/ApiServices';
import axios from 'axios';

const HeaderLogged = () => {
    // Liste des utilisateurs.
    const [userList, setUserList] = useState([]);

    // L'utilisateur connecté
    const [currentUser, setCurrentuser] = useState('');

    // Affichage des options utilisateurs/admins du Header
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showAdminOptions, setShowAdminOptions] = useState(false);

    // Affichage des informations de l'utilisateur connecté
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    /**
     * Récupère la liste des utilisateurs (userList).
     * Affiche les options d'administration si l'utilisateur est admin.
     */
    useEffect(() => {
        async function getUsers() {
            // const response = await axios.get(getAllUsers.getUsers);
            // const data = await response.data;
            // setUserList(data);
        };
        getUsers();

        if (localStorage.getItem('userAdmin') == 0) {
            setShowUserOptions(true);
        }
        else if (localStorage.getItem('userAdmin') == 1) {
            setShowUserOptions(true);
            setShowAdminOptions(true);
        }
    }, []);

    /**
     * Récupère les informations de l'utilisateur connecté.
     */
    const accountClick = () => {
        userList.forEach((el) => {
            if (el.id == localStorage.getItem('userId')) {
                setCurrentuser(el);
            }
        })
        setShowAccountInfo(!showAccountInfo);
    };

    return (
        <div className='header'>
            <div className="headerLogo"></div>
            {showUserOptions && (
                <div className="headerLinks">
                    <Link className='headerLink'>Accueil</Link>
                    <Link className='headerLink'>Séries</Link>
                    <Link className='headerLink'>Films</Link>
                </div>
            )}
            {showAdminOptions && (
                <div className="headerIcons">
                    <Link to='/manageUsers' className="headerUserIcon fa-solid fa-users" />
                    <Link to='#' className="headerMovieIcon fa-sharp fa-solid fa-video" />
                </div>
            )}
            <Link className='headerAccountBtn' onClick={accountClick}>Mon compte</Link>
            {showAccountInfo && (
                <div className='accountInfos'>
                    <p>{currentUser.firstname} {currentUser.lastname}</p>
                    <Link to='/userAccount' className='accountMenu'>Gérer mon compte</Link>
                    <Link to='/' className='accountMenu'>Me déconnecter</Link>
                </div>
            )}
        </div>
    );
};

export default HeaderLogged;
