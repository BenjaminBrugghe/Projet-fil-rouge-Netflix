import React from 'react';
import { useState, useEffect } from 'react';
import HeaderLogged from '../Components/HeaderLogged';
import Rows from '../Components/Rows';
import Service from '../Assets/ApiServices';

const Feed = () => {

    const [movieList, setMovieList] = useState([]);
    const [documentaryList, setDocumentaryList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');

    const _service = new Service();
    const [userLogged, setUserLogged] = useState({});

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
        // console.log("UseEffect-userLogged : " + userLogged);
    }, []);

    // console.log(`userLogged : "${userLogged}"`);

    // Génère un nombre aléatoire pour afficher une vidéo dans le lecteur.
    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const nbRandom = randomize(1, movieList.length);

    return (
        <div className='feed'>
            <HeaderLogged />
            {movieList && (
                movieList.map(movie => {
                    if (movie.id === nbRandom) {
                        return (
                            <div className='currentVideo' key={movie.id}>
                                <video className='video' controls autoPlay src={movie.videoUrl} type="video/Mp4" />
                                <p className='currentTitle'>{movie.title}</p>
                                <p className='currentDescription'>{movie.description}</p>
                                <div className='feedButtons'>
                                    <button className='buttonPlay'><i className="fa-solid fa-play"></i>Play</button>
                                    <button className='buttonInfos'><i className="fa-solid fa-circle-info"></i>Details</button>
                                </div>
                            </div>
                        )
                    }
                })
            )}
            {userLogged &&
                <Rows mediaList={movieList} rowTitle={userLogged.lastname} />
            }
            <Rows mediaList={documentaryList} rowTitle="Series" />
            <Rows mediaList={movieList} rowTitle="Documentaries" />
        </div>
    );
};

export default Feed;
