import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Service from '../Assets/ApiServices';
import RegisterPopUp from '../Components/RegisterPopUp';
import Regex from '../Assets/Regex';

const Register = () => {

    const _regex = new Regex();
    const _service = new Service();

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

    // Pour vérifier que l'email n'est pas déjà utilisé
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(true);

    /**
     * Affiche une fenêtre avec un message affichant le succès de la création du compte.
     */
    function registerSuccess() {
        setShowRegisterForm(!showRegisterForm);
        setShowSuccess(!showSuccess);
    };

    /**
     * Effectue les vérifications des regex pour les données saisies par l'utilisateur
     * @param {string} lastname Le nom saisi par l'utilisateur
     * @param {string} firstname Le prénom saisi par l'utilisateur
     * @param {string} email L'email saisi par l'utilisateur
     * @param {string} password Le mot de passe saisi par l'utilisateur
     * @param {string} confirmPassword La confirmation du mot de passe saisie par l'utilisateur
     */
    function checkRegex(lastname, firstname, email, password, confirmPassword) {
        setLastnameRegexOK(_regex.checkLastnameRegex(lastname));
        setFirstnameRegexOK(_regex.checkFirstnameRegex(firstname));
        setEmailRegexOK(_regex.checkEmailRegex(email));
        setPasswordRegexOK(_regex.checkPasswordRegex(password));
        setConfirmPassWordRegexOk(_regex.checkConfirmPasswordRegex(password, confirmPassword));
    };

    /**
     * Affiche une alerte en fonction de la regex qui n'est pas respectée
     */
    function regexAlert() {
        switch (undefined) {
            case lastnameRegexOK:
                alert('Erreur ! Le nom doit contenir au moins 3 caractères');
                break;
            case firstnameRegexOK:
                alert('Erreur ! Le prénom doit contenir au moins 3 caractères');
                break;
            case emailRegexOK:
                alert("Erreur ! L'adresse email n'est pas valide (Format : Example@email.com)");
                break;
            case passwordRegexOK:
                alert('Erreur ! Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
                break;
            case confirmPasswordRegexOK:
                alert('Erreur ! Les deux mots de passe doivent correspondre');
                break;
            default:
                break;
        }
    };

    /**
     * Vérifie que l'email saisi par l'utilisateur n'est pas déjà utilisé et affiche une alerte si c'est le cas
     * @param {string} email L'email saisi par l'utilisateur
     */
    async function checkEmail(email) {
        const emailAlreadyExists = await _service.getUserByEmail(email);
        if (emailAlreadyExists) {
            alert("Erreur ! L'adresse email est déjà utilisée");
            setEmailAlreadyUsed(true);
        }
        else {
            setEmailAlreadyUsed(false);
        }
    };

    /**
     * Effectue les vérifications pour les regex et vérifie que l'email n'est pas déjà utilisé.
     * Si tout est correct, crée l'utilisateur et affiche un message de succès.
     */
    function registerClick(event) {
        event.preventDefault();

        // Vérification des Regex et correspondance des 2 mots de passe
        checkRegex(lastname, firstname, email, password, confirmPassword);

        // Si tous les champs sont corrects, je vérifie que l'email n'est pas déjà utilisé
        if (lastnameRegexOK && firstnameRegexOK && emailRegexOK && passwordRegexOK && confirmPasswordRegexOK) {
            checkEmail(email);
        }
        else { // Si un des champs n'est pas correct, affiche une alerte
            regexAlert();
        };

        // Si l'email n'est pas déjà utilisé, crée l'utilisateur et affiche un message de succès
        if (emailAlreadyUsed == false) {
            const newUser = {
                lastname: lastname,
                firstname: firstname,
                email: email,
                password: password
            }
            _service.createNewUser(newUser);
            registerSuccess();
        };
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
