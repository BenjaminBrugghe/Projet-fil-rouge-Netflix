import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Service from '../Assets/ApiServices';

import bcrypt from 'bcryptjs';

const Login = () => {

    // Pour récupérer les informations de l'utilisateur
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _service = new Service();

    const _navigate = useNavigate();

    async function hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    };

    /**
     * Envoi les informations saisies pour vérifier le token.
     * Stocke le token dans le localStorage et redirige vers /feed
     */
    async function loginCLick() {
        // Création d'un objet avec les informations pour le token
        const userInfo = {
            email: email,
            password: password
            // password: hashPassword(password) // LocalStorage => token.value = "Erreur, mot de passe incorrect."
        }

        // Vérifie si l'utilisateur est banni
        const isBanned = await _service.checkBanStatus(userInfo.email);
        if (isBanned == true) {
            alert("Erreur, votre compte a été suspendu.");
        }
        else {
            // J'envois les informations pour vérifications
            const newToken = await _service.createToken(userInfo);

            // Stocke le token dans le localStorage et redirige vers /feed
            localStorage.setItem("token", newToken);
            _navigate('/feed');
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
