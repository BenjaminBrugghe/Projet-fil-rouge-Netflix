import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPopUp = () => {
    return (
        <div className="successRegister">
            <p className="successText1">Votre compte a été créé avec succès !</p>
            <p className="successText2">Connectez vous dès maintenant !</p>
            <Link to='/login' className='successLink'>S'identifier</Link>
        </div>
    );
};

export default RegisterPopUp;
