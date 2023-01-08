import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

const HomePage = () => {

    // localStorage.removeItem('token');

    return (
        <div className='homePage'>
            <Header />
            <div className="homeText">
                <p className='homeTextOne'>Films, séries et bien plus en illimité.</p>
                <p className='homeTextTwo'>Où que vous soyez,. Annulez à tout moment.</p>
                <p className='homeTextThree'>Prêt à regarder Netflix ? Inscrivez-vous dès maintenant !</p>
                <Link to='/register' className='homeRegisterLink'>Je m'inscris</Link>
            </div>
        </div>
    );
};

export default HomePage;