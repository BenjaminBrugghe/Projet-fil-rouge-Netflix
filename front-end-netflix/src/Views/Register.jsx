import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { createUser, getAllUsers } from '../Datas/ApiServices';
import RegisterPopUp from '../Components/RegisterPopUp';

const Register = () => {

    // Liste des utilisateurs
    const [userList, setUserList] = useState([]);

    // Pour récupérer les informations de l'utilisateur
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Pour afficher ou non les fenêtres
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    // Pour vérification des Regex
    const [lastnameRegexOK, setLastnameRegexOK] = useState(false);
    const [firstnameRegexOK, setFirstnameRegexOK] = useState(false);
    const [emailRegexOK, setEmailRegexOK] = useState(false);
    const [passwordRegexOK, setPasswordRegexOK] = useState(false);
    const [confirmPasswordRegexOK, setConfirmPassWordRegexOk] = useState(false);

    // Regex pour les inputs
    const regexName = /^[a-zA-ZÀ-ÿ\s\-]{3,}$/; // 3 caractères minimum, lettres, espaces et tirets
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/; // Format email
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; // 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial

    // Pour vérifier que l'email n'est pas déjà utilisé
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(true);

    /**
     * Récupère la liste des utilisateurs
     */
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(getAllUsers.getUsers);
            const data = await response.data;
            setUserList(data);
        };
        getUsers();
    }, []);

    /**
     * Affiche une fenêtre avec un message affichant le succès de la création du compte.
     */
    function registerSuccess() {
        setShowRegisterForm(!showRegisterForm);
        setShowSuccess(!showSuccess);
    };

    /**
     * Lance les vérifications afin d'enregister l'utilisateur.
     * Affiche une fenêtre avec un message en cas d'erreur dans le formulaire.
     */
    function registerClick(event) {
        event.preventDefault();

        // Vérification des Regex
        checkLastnameRegex(lastname);
        checkFirstnameRegex(firstname);
        checkEmailRegex(email);
        checkPasswordRegex(password);
        checkConfirmPasswordRegex(confirmPassword);

        // Vérifie que l'addresse email n'est pas déjà utilisée
        userList.map((user) => {
            if (user.email == email) {
                alert('Erreur ! Cette adresse email est déjà utilisée');
            }
            else {
                setEmailAlreadyUsed(false);
            }
        });

        // Si l'email n'est pas déjà utilisé, vérifie que les mots de passe correspondent
        if (emailAlreadyUsed == false) {
            if (password != confirmPassword) {
                alert('Erreur ! Les deux mots de passe doivent correspondre');
            }
            else { // Si les mots de passe correspondent, vérifie que les Regex sont OK
                if (lastnameRegexOK && firstnameRegexOK && emailRegexOK && passwordRegexOK && confirmPasswordRegexOK) {
                    const newUser = {
                        lastname: lastname,
                        firstname: firstname,
                        email: email,
                        password: password
                    }
                    // Crée l'utilisateur et affiche un message de succès
                    createUser(newUser);
                    registerSuccess();
                }
            }
        }
    };

    const checkLastnameRegex = () => {
        if (regexName.test(lastname)) {
            setLastnameRegexOK(true);
        }
        else {
            alert("Erreur ! Le nom doit contenir au moins 3 caractères")
        }
    };

    const checkFirstnameRegex = () => {
        if (regexName.test(firstname)) {
            setFirstnameRegexOK(true);
        }
        else {
            alert("Erreur ! Le prénom doit contenir au moins 3 caractères")
        }
    };

    const checkEmailRegex = () => {
        if (regexEmail.test(email)) {
            setEmailRegexOK(true);
        }
        else {
            alert("Erreur ! L'adresse email n'est pas valide (Format : Example@email.com)")
        }
    };

    const checkPasswordRegex = () => {
        if (regexPassword.test(password)) {
            setPasswordRegexOK(true);
        }
        else {
            alert("Erreur ! Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial")
        }
    };

    const checkConfirmPasswordRegex = () => {
        if (regexPassword.test(confirmPassword)) {
            setConfirmPassWordRegexOk(true);
        }
        else {
            alert("Erreur ! Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial")
        }
    };

    return (
        <div className='register'>
            <Header />
            {showRegisterForm &&
                <div className="registerForm">
                    <p className="registerText">S'enregister</p>
                    <input type="text" className="registerInput" placeholder='Nom' onChange={(e) => setLastname(e.target.value)} />
                    <input type="text" className="registerInput" placeholder='Prénom' onChange={(e) => setFirstname(e.target.value)} />
                    <input type="text" className="registerInput" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className="registerInput" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className="registerInput" placeholder='Confirmer le mot de passe' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='registerButton' onClick={registerClick}>S'enregister</button>
                    <p className='registerTextBottom'>
                        Déjà inscrit sur Netflix ?
                        <Link to='/login' className='registerLink'>Identifiez-vous</Link>
                    </p>
                </div>
            }
            {showSuccess && <RegisterPopUp />}
        </div>
    );
};

export default Register;
