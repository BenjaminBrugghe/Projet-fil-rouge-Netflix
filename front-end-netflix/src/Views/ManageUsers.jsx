import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../Assets/ApiServices';
import HeaderLogged from '../Components/HeaderLogged';
import Unauthorized from './Unauthorized';

const ManageUsers = () => {

    const _service = new Service();

    // la liste des utilisateurs
    const [userList, setUserList] = useState([]);

    // L'utilisiteur qui correspond au token
    const [userLogged, setUserLogged] = useState({});

    // l'utilisateur sur lequel on a cliqué
    const [userClicked, setUserClicked] = useState({});

    // affiche un message de succès après la connexion
    const [showSuccess, setShowSuccess] = useState(false);

    const _navigate = useNavigate();

    // Récupère la liste des utilisateurs et les informations du token
    useEffect(() => {
        async function getAllUsers() {
            const response = await _service.getAllUsers();
            setUserList(response);
        }
        async function getUser() {
            const token = localStorage.getItem("token");
            const tokenTmp = {
                userToken: token
            }
            const user = await _service.verifyToken(tokenTmp);
            setUserLogged(user);
        }
        getAllUsers();
        getUser();
    }, [userClicked]);

    /**
     * Suspend le compte de l'utilisateur. S'il l'était déjà, alors il sera réactivé.
     * @param {user} user L'utilisateur qui correspond au bouton cliqué.
     */
    async function banClick(user) {
        const response = await _service.banOrUnbanUser(user.id);
        setUserClicked(response);
        setShowSuccess(!showSuccess);
    };

    /**
     * Affiche un message pour confirmer la suspension du compte utilisateur ou sa réactivation.
     */
    function okSuccessClick() {
        setShowSuccess(!showSuccess);
    };

    /**
     * Retourne à la page précédente.
     */
    function goBackClick() {
        _navigate(-1);
    };

    return (
        <div className='manageUsers'>
            {userLogged.admin == true ?
                <>
                    <HeaderLogged user={userLogged} />
                    <div className="manageUsersContainer">
                        <p className='manageUsersTitle'>Gestion des utilisateurs</p>
                        {userList && (
                            userList.map(user => {
                                return (
                                    <p key={user.id} className='mappedUsers'>
                                        {user.id}- {user.lastname} {user.firstname} {user.banned == 1 ? " - (Suspendu)" : ""}
                                        <button className='mappedUsersButton' onClick={() => banClick(user)}>Bannir</button>
                                    </p>
                                )
                            })
                        )}
                    </div>
                    <button className='manageUsersReturnBtn' onClick={goBackClick}>Retour</button>
                    {showSuccess && (
                        <div className="showSuccess">
                            <h2>Le compte de {userClicked.lastname} {userClicked.firstname} a été {userClicked.banned == 1 ? 'suspendu avec succès.' : 'réactivé avec succès.'}</h2>
                            <button className='okBannedButton' onClick={okSuccessClick}>Ok</button>
                        </div>
                    )}
                </>
                :
                <Unauthorized />
            }
        </div>
    );
};

export default ManageUsers;
