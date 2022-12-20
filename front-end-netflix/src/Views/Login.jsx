import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { getAllUsers } from '../Datas/ApiServices';

const Login = () => {

    const [userList, setUserList] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _navigate = useNavigate();

    /**
     * Récupère la liste des utilisateurs.
     */
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(getAllUsers.getUsers);
            const data = await response.json();
            setUserList(data);
        }
        getUsers();

    }, []);
    
    // document.addEventListener("keyup", function (event) {
    //     if (event.key == "Enter") {
    //         loginCLick();
    //     }
    // });
    // return () => {
    //     document.removeEventListener("keyup", loginCLick);
    // }
    
    /**
     * Vérifie les informations afin de connecter l'utilisateur et le renvoyer vers /feed.
     * Affiche une fenêtre avec un message en cas d'erreur.
     */
    function loginCLick() {
        let found = false;
        let currentUser = null;

        // Récupère les informations de l'utilisateur connecté
        userList.forEach((user) => {
            if (email == user.email && password == user.password && !found) {
                currentUser = user;
                found = true;
            }
        });

        // Vérifie si l'utilisateur a été bannit et affiche un message d'erreur si c'est le cas.
        if (found) {
            if (currentUser.banned == 1) {
                // alert('Erreur ! Votre compte a été bannit !');
            }
            else {
                // Stockage des informations pour les récupèrer dans le <HeaderLogged> de /feed
                    // L'id pour afficher les infos de l'utilisateur
                    // Le user.admin pour afficher ou non les options Admin dans le header 
                localStorage.setItem('userId', currentUser.id);
                localStorage.setItem('userAdmin', currentUser.admin);
                _navigate('/feed');
            }
        }
        else {
            // alert('Erreur ! E-mail ou mot de passe incorrect !');
        }
    };

    return (
        <div className='login'>
            <Header />
            <div className="loginForm">
                <p className='loginText'>S'identifier</p>
                <input className='loginInput' type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                <input className='loginInput' type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                <button className='loginButton' onClick={loginCLick}>S'identifier</button>
                <p className='loginTextBottom'>
                    Première visite sur Netflix ?
                    <Link to='/register' className='loginLink'>Inscrivez-vous</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
