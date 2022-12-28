import React from 'react';
import { useState, useEffect } from 'react';
import { getAllMovies } from '../Datas/ApiServices';
import axios from 'axios';
import HeaderLogged from '../Components/HeaderLogged';
import Rows from '../Components/Rows';

const Feed = () => {

    const [movieList, setMovieList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');

    /**
     * Récupère la liste des films (movieList).
     */
    useEffect(() => {
        async function getMovies() {
            const response = await fetch(getAllMovies.getMovies);
            const data = await response.json();
            setMovieList(data);
        }
        getMovies();
    }, []);

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
            <Rows mediaList={movieList} />
            <Rows mediaList={movieList} />
            <Rows mediaList={movieList} />
        </div>
    );
};

export default Feed;
