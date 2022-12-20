import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {

    const _naviguate = useNavigate();

    function goBack () {
        _naviguate(-1);
    };

    return (
        <div className='error404'>
            <h1 className='errorText'>Erreur 404, la page n'a pas été trouvée.</h1>
            <button className='errorButton' onClick={goBack}>Retour</button>
        </div>
    );
};

export default Error404;