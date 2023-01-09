import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const Unauthorized = () => {
    const _naviguate = useNavigate();

    function goBack() {
        _naviguate(-1);
    };

    function goToLogin() {
        _naviguate("/login");
    }

    return (
        <>
            <Header />
            <div className='error404'>
                <h1 className='errorText'>Unauthorized token.</h1>
                <h2 className='loginText'>Merci de vous connecter</h2>
                <div className='unauthButtons'>
                    <button className='goToLoginButton' onClick={goToLogin}>Me connecter</button>
                    <button className='errorButton' onClick={goBack}>Retour</button>
                </div>
            </div>
        </>
    );
};

export default Unauthorized;