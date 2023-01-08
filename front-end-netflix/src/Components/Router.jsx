import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../Views/HomePage';
import Error404 from '../Views/Error404';
import Login from '../Views/Login';
import Register from '../Views/Register';
import Feed from '../Views/Feed';
import UserAccount from '../Views/UserAccount';
import ManageUsers from '../Views/ManageUsers';
import Unauthorize from '../Views/Unauthorize';
import Service from '../Assets/ApiServices';

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/feed' element={<Feed />} />
                {/* <Route path='/feed' element={token != null ? <Feed /> : <Unauthorize />} /> */}
                <Route path='/*' element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;