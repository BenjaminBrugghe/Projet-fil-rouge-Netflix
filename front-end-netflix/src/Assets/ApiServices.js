import axios from "axios";
const _URL = 'http://localhost:5290/api';

// ********** USERS **********

export const getAllUsers = async () => {
    const response = await axios.get(`${_URL}/Users`);
    const data = await response.data;
    return data;
};

export const createUser = async (user) => {
    const response = await axios.post(`${_URL}/Users`, {
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
        password: user.password,
    });
    const data = await response.data;
    return data;
};

export const editUser = async (user) => {
    const response = await axios.put(`${_URL}/Users/${user.id}`, {
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
        password: user.password,
    });
    const data = await response.data;
    return data;
};

// ********** MOVIES **********

export const getAllMovies = {
    getMovies: `${_URL}/Movies`
};

// ********** DOCUMENTARIES **********

export const getAllDocumentaries = {
    getDocumentaries: `${_URL}/Documentaries`
};
