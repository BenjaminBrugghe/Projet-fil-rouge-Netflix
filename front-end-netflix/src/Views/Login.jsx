import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Service from '../Assets/ApiServices';

const Login = () => {

    // Pour récupérer les informations de l'utilisateur
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _service = new Service();

    const _navigate = useNavigate();

    /**
     * Envoi les informations saisies pour vérifier le token.
     * Stocke le token dans le localStorage et redirige vers /feed
     */
    async function loginCLick() {
        // Création d'un objet avec les informations pour le token
        const userInfo = {
            email: email,
            password: password
        }

        // J'envois les informations pour vérifications
        const newToken = await _service.createToken(userInfo);

        // Si le token est valide, je le stocke dans le localStorage et je redirige vers /feed
        localStorage.setItem("token", newToken);
        _navigate('/feed');
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
