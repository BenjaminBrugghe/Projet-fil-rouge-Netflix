import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../Datas/ApiServices';
import axios from 'axios';

const HeaderLogged = () => {
    const [userOptions, setUserOptions] = useState('hiddenClass'); // headerLinks
    const [adminOptions, setAdminOptions] = useState('hiddenClass'); // headerIcons
    const [show, setShow] = useState(false);

    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentuser] = useState('');

    useEffect(() => {

        async function getUsers() {
            const response = await axios.get(getAllUsers.getUsers);
            const data = await response.data;
            setUserList(data);
        };
        getUsers();

        if (localStorage.getItem('userAdmin') == 0) {
            setUserOptions("headerLinks");
        }
        else if (localStorage.getItem('userAdmin') == 1) {
            setUserOptions("headerLinks");
            setAdminOptions("headerIcons");
        }
    }, []);

    const accountClick = () => {
        userList.forEach((el) => {
            if (el.id == localStorage.getItem('userId')) {
                setCurrentuser(el);
            }
        })
        setShow(!show);
    };

    return (
        <div className='header'>
            <div className="headerLogo"></div>
            <div className={userOptions}>
                <Link className='headerLink'>Accueil</Link>
                <Link className='headerLink'>Séries</Link>
                <Link className='headerLink'>Films</Link>
            </div>
            <div className={adminOptions}>
                <Link to='/manageUsers' className="headerUserIcon fa-solid fa-users" />
                <Link to='#' className="headerMovieIcon fa-sharp fa-solid fa-video" />
            </div>
            <Link className='headerAccountBtn' onClick={accountClick}>Mon compte</Link>
            {show && (
                <div className='accountInfos'>
                    <p className="">{currentUser.firstname} {currentUser.lastname}</p>
                    <Link to='/userAccount' className='accountMenu'>Gérer mon compte</Link>
                    <Link to='/' className='accountMenu'>Me déconnecter</Link>
                </div>
            )}
        </div>
    );
};

export default HeaderLogged;
