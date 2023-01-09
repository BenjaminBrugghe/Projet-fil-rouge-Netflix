import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLinks = () => {
    return (
        <div className="headerLinks">
            <Link className='headerLink'>Accueil</Link>
            <Link className='headerLink'>Séries</Link>
            <Link className='headerLink'>Films</Link>
        </div>
    );
};

export default HeaderLinks;
