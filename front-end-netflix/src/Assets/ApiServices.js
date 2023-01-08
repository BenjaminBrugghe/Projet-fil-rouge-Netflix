import axios from "axios";
// import "dotenv/config";

// const Url_Users = `${process.env.JSONSERVER}/Users`;
const Url_Users = "http://localhost:3001/Users";

export default class Service {

    // ********** USERS **********

    /**
     * Récupère la liste des utilisateurs
     * @returns {Promise<*>} La liste des utilisateurs
     */
    getAllUsers = async () => {
        const response = await axios.get(Url_Users);
        const data = await response.data;
        return data;
    };

    /**
     * Récupère un utilisateur via son email
     * @param {string} email L'email de l'utilisateur qu'on recherche
     * @returns {Promise<*>} L'utilisateur correspondant à l'email
     */
    getUserByEmail = async (email) => {
        const response = await this.getAllUsers();
        const user = response.find(user => user.email == email);
        return user;
    };

    /**
     * Crée un nouvel utilisateur
     * @param {User} newUser L'utilisateur à créer
     * @returns {Promise<*>} Le nouvel utilisateur créé
     */
    createNewUser = async (newUser) => {
        const response = await axios.post(Url_Users, newUser);
        const data = await response.data;
        return data;
    };

    /**
     * Crée un token pour l'utilisateur connecté
     * @param {User} user 
     * @returns {Promise<*>} Le token de l'utilisateur
     */
    createToken = async (user) => {
        const response = await axios.post(Url_Users + "/token", user);
        const data = await response.data;
        return data;
    };

    verifyToken = async (token) => {
        console.log("token.userToken : ", token.userToken); // Le token est bon ici
        const response = await axios.get(Url_Users + "/verifyToken", {
            headers: {
                'Authorization': `${token.userToken}`
            }
        }, token);

        console.log("response : ", response); // Status 200 (OK)
        const data = await response.data;
        console.log("data : ", data); // Invalid token
        return data;
    };


    // ********** MOVIES **********
    // ********** SERIES **********
    // ********** DOCUMENTARIES **********
}
