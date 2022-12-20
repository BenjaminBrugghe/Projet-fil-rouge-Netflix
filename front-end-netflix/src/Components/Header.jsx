import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <div className='header'>
            <div className="headerLogo"></div>
            <Link to='/login' className='headerLoginBtn'>S'identifier</Link>
        </div>
    );
};

export default Header;
