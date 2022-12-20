import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
             <div className='footerLogos'>
                <a href='https://www.facebook.com/netflixfrance' target='blank' className='footerButton'> <i className="fa-brands fa-facebook-f"></i></a>
                <a href='https://www.instagram.com/NetflixFR/' target='blank' className='footerButton'> <i className="fa-brands fa-instagram" ></i></a>
                <a href='https://twitter.com/NetflixFR' target='blank' className='footerButton'> <i className="fa-brands fa-twitter" ></i></a>
                <a href='https://www.youtube.com/user/netflixfrance' target='blank' className='footerButton'> <i className="fa-brands fa-youtube" ></i></a>
            </div>
            <div className='footerLinks'>
                <div className='footerLink'>
                    <div>Relations investisseurs</div>
                    <div>Modes de lecture</div>
                    <div>Mentions légales</div>
                    <div>Informations légales</div>
                </div>
                <div className='footerLink'>
                    <div>Centre d'aide</div>
                    <div>Recrutement</div>
                    <div>Conditions d'utilisation</div>
                    <div>Nous contacter</div>
                </div>
                <div className='footerLink'>
                    <div>Compte</div>
                    <div>Utiliser des cartes cadeaux</div>
                    <div>Confidentialité</div>
                    <div>Test de vitesse</div>
                </div>
                <div className='footerLink'>
                    <div>Press</div>
                    <div>Acheter des cartes cadeaux</div>
                    <div>Préférences de cookies</div>
                    <div>Garantie légale</div>
                </div>
            </div>
            <p>&copy; 2022 - Brugghe Benjamin - Projet Fil Rouge, M2i Formation</p>
        </div>
    );
};

export default Footer;
