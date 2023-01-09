import React from 'react';
import { useState, useEffect } from 'react';
import Service from '../Assets/ApiServices';
import HeaderLogged from '../Components/HeaderLogged';
import Rows from '../Components/Rows';
import Unauthorized from './Unauthorized';

const Feed = () => {

    const [movieList, setMovieList] = useState([]);
    const [documentaryList, setDocumentaryList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');

    const _service = new Service();
    const [userLogged, setUserLogged] = useState({});

    // Récupère le token dans le localStorage et effectue une requête pour récupérer les informations de l'utilisateur connecté
    useEffect(() => {
        async function getUser() {
            const token = localStorage.getItem("token");
            const tokenTmp = {
                userToken: token
            }
            const user = await _service.verifyToken(tokenTmp);
            setUserLogged(user);
        }
        getUser();
    }, []);

    /**
     * Génère un nombre aléatoire pour afficher une vidéo dans le lecteur.
     * @param {number} min Le nombre minimum
     * @param {number} max Le nombre maximum
     * @returns Un nombre aléaoire comprit entre min et max
     */
    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const nbRandom = randomize(1, movieList.length);

    return (
        <div className='feed'>
            {userLogged.id ?
                <>
                    <HeaderLogged user={userLogged} />
                    <div className='currentVideo'>
                        <video className='video' controls autoPlay src="#" type="video/Mp4" />
                        <p className='currentTitle'>Titre de la vidéo</p>
                        <p className='currentDescription'>Description de la vidéo</p>
                        <div className='feedButtons'>
                            <button className='buttonPlay'><i className="fa-solid fa-play"></i>Play</button>
                            <button className='buttonInfos'><i className="fa-solid fa-circle-info"></i>Details</button>
                        </div>
                    </div>
                    <>
                        <Rows mediaList={movieList} rowTitle="Films" />
                        <Rows mediaList={documentaryList} rowTitle="Series" />
                        <Rows mediaList={movieList} rowTitle="Documentaires" />
                    </>
                </>
                :
                <Unauthorized />
            }
        </div>
    );
};

export default Feed;
