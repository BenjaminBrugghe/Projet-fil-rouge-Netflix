import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorize = () => {
    const _naviguate = useNavigate();

    function goBack() {
        _naviguate(-1);
    };
    return (
        <div className='error404'>
            <h1 className='errorText'>Unauthorized token.</h1>
            <button className='errorButton' onClick={goBack}>Retour</button>
        </div>
    );
};

export default Unauthorize;