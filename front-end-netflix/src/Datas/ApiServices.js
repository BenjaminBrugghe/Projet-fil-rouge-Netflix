const _BASE_URL = 'http://localhost:5290/api';

// ********** USERS **********

export const getAllUsers = {
    getUsers: `${_BASE_URL}/Users`
};

export const createUser = async (user) => {

    const response = await fetch(_BASE_URL + '/Users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            id: 0,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            password: user.password,
            admin: 0,
            banned: 0,
            token: ''
        })
    })
    const content = await response.json();
    return content;
};

export const editUser = async (user) => {
    const response = await fetch(_BASE_URL + '/Users/' + user.id, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            password: user.password,
            admin: user.admin,
            banned: user.banned,
            token: user.token
        })
    })
    const content = await response.json();
    return content;
};

// ********** MOVIES **********

export const getAllMovies = {
    getMovies: `${_BASE_URL}/Movies`
};

// ********** DOCUMENTARIES **********

export const getAllDocumentaries = {
    getDocumentaries: `${_BASE_URL}/Documentaries`
};
