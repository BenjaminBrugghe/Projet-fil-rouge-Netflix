import React from 'react';
import { useState, useEffect } from 'react';
import { editUser, getAllUsers } from '../Datas/ApiServices';
import axios from 'axios';
import HeaderLogged from '../Components/HeaderLogged';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {

    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentuser] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const _navigate = useNavigate();

    /**
     * Récupère la liste des utilisateurs.
     */
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(getAllUsers.getUsers);
            const data = await response.data;
            setUserList(data);
        };
        getUsers();
    }, [currentUser]);

    /**
     * Bannit un utilisateur. S'il l'était déjà, alors il sera débannit
     * @param {*} user L'utilisateur qui correspond au bouton cliqué.
     */
    function banClick(user) {
        if (user.banned == 0) {
            const newUser = {
                id: user.id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: user.password,
                admin: user.admin,
                banned: 1, // banned: user.banned == 0 ? 1 : 0,  => Ne fonctionne pas, pourquoi ?
                token: user.token
            }
            editUser(newUser);
            setCurrentuser(newUser);
            setShowSuccess(!showSuccess);
        } else if (user.banned == 1) {
            const newUser = {
                id: user.id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: user.password,
                admin: user.admin,
                banned: 0,
                token: user.token
            }
            editUser(newUser);
            setCurrentuser(newUser);
            setShowSuccess(!showSuccess);
        }
    };

    /**
     * Affiche un message pour confirmer le banissement / débanissement d'un utilisateur.
     */
    function okSuccessClick() {
        setShowSuccess(!showSuccess);
    };

    function manageUsersReturnClick() {
        _navigate(-1);
    };

    return (
        <div className='manageUsers'>
            <HeaderLogged />
            <div className="manageUsersContainer">
                <p className='manageUsersTitle'>Gestion des utilisateurs</p>
                {userList && (
                    userList.map(user => {
                        return (
                            <p key={user.id} className='mappedUsers'>
                                {user.id}- {user.lastname} {user.firstname} {user.banned == 1 ? " (Banned)" : ""}
                                <button className='mappedUsersButton' onClick={() => banClick(user)}>Bannir</button>
                            </p>
                        )
                    })
                )}
            </div>
            <button className='manageUsersReturnBtn' onClick={manageUsersReturnClick}>Retour</button>
            {showSuccess && (
                <div className="showSuccess">
                    <h2>L'utilisateur {currentUser.lastname} {currentUser.firstname} a été {currentUser.banned == 1 ? 'bannit' : 'débannit'}</h2>
                    <button className='okBannedButton' onClick={okSuccessClick}>Ok</button>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
