import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLinksAdmin = () => {
    return (
        <div className="headerIcons">
            <Link to='/manageUsers' className="headerUserIcon fa-solid fa-users" />
            <Link to='#' className="headerMovieIcon fa-sharp fa-solid fa-video" />
        </div>
    );
};

export default HeaderLinksAdmin;
