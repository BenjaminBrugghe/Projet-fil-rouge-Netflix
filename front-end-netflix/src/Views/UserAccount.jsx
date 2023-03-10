import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, editUser } from '../Datas/ApiServices';
import axios from 'axios';
import HeaderLogged from '../Components/HeaderLogged';

const UserAccount = () => {

    // Liste des utilisateurs.
    const [userList, setUserList] = useState([]);

    // Utilisateur connecté
    const [currentUser, setCurrentuser] = useState('');

    // Informations de l'utilisateur.
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Affiche une fenêtre de confirmation de modification.
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

    const _navigate = useNavigate();

    /**
     * Récupère la liste des utilisateurs.
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
     * Récupère l'utilisateur connecté.
     */
    useEffect(() => {
        userList.forEach((user) => {
            if (user.id == localStorage.getItem('userId')) {
                setCurrentuser(user);
            }
        });
    }, [userList]);

    /**
     * Vérifie la confirmation du mot de passe, et modifie les informations de l'utilisateur.
     * @param {*} event Pour preventDefault().
     */
    function modificationClick(event) {
        event.preventDefault();

        // Vérification des Regex
        checkLastnameRegex(lastname == '' ? currentUser.lastname : lastname);
        checkFirstnameRegex(firstname == '' ? currentUser.firstname : firstname);
        checkEmailRegex(email == '' ? currentUser.email : email);
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
            if (password != '' && password != confirmPassword) {
                alert("Erreur ! Les deux mots de passe doivent correspondre")
            }
            else if (password == '' && currentUser.password != confirmPassword) {
                alert("Erreur ! Veuillez confirmer votre mot de passe");
            }
            else { // Si les mots de passe correspondent, vérifie que les Regex sont OK
                if (lastnameRegexOK && firstnameRegexOK && emailRegexOK && passwordRegexOK && confirmPasswordRegexOK) {
                    const newUser = {
                        id: currentUser.id,
                        lastname: lastname ? lastname : currentUser.lastname,
                        firstname: firstname ? firstname : currentUser.firstname,
                        email: email ? email : currentUser.email,
                        password: password ? password : currentUser.password,
                        admin: currentUser.admin,
                        banned: currentUser.banned,
                        token: currentUser.token
                    }
                    editUser(newUser);
                    alert("Informations modifiées avec succès !")
                    resetInputs();
                }
            }
        }
    };

    /**
    * Vérifie que le nom contient au moins 3 caractères et pas de nombres
    */
    const checkLastnameRegex = (lastname) => {
        if (regexName.test(lastname)) {
            setLastnameRegexOK(true);
        }
        else {
            alert("Erreur ! Le nom doit contenir au moins 3 caractères et ne doit pas contenir de chiffres")
        }
    };

    /**
     * Vérifie que le prénom contient au moins 3 caractères et pas de nombres
     */
    const checkFirstnameRegex = (firstname) => {
        if (regexName.test(firstname)) {
            setFirstnameRegexOK(true);
        }
        else {
            alert("Erreur ! Le prénom doit contenir au moins 3 caractères et ne doit pas contenir de chiffres")
        }
    };

    /**
     * Vérifie que l'email est au bon format
     */
    const checkEmailRegex = (email) => {
        if (regexEmail.test(email)) {
            setEmailRegexOK(true);
        }
        else {
            alert("Erreur ! L'adresse email n'est pas valide (Format : Example@email.com)")
        }
    };

    /**
     * Vérifie que le mot de passe contient au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
     */
    const checkPasswordRegex = (password) => {
        if (regexPassword.test(password)) {
            setPasswordRegexOK(true);
        }
        else {
            alert("Erreur ! Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial")
        }
    };

    /**
     * Vérifie que le 2ème mot de passe contient au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
     */
    const checkConfirmPasswordRegex = (confirmPassword) => {
        if (regexPassword.test(confirmPassword)) {
            setConfirmPassWordRegexOk(true);
        }
        else {
            alert("Erreur ! Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial")
        }
    };

    /**
     * Réinitialise les inputs.
     */
    function resetInputs() {
        document.querySelector('#input1').value = "";
        document.querySelector('#input2').value = "";
        document.querySelector('#input3').value = "";
        document.querySelector('#input4').value = "";
        document.querySelector('#input5').value = "";
    }

    /**
     * Retourne à la page précédente.
     */
    function returnClick() {
        _navigate(-1);
    };

    /**
     * Referme la fenêtre de confirmation.
     */
    function okClick() {
        setShowSuccess(!showSuccess);
    };

    return (
        <div className='userAccount'>
            <HeaderLogged />
            {currentUser &&
                <div className="accountForm">
                    <p className="accountText">Modifier mes infos</p>
                    <input id='input1' type="text" className="accountInput" placeholder={currentUser.firstname} onChange={(e) => setLastname(e.target.value)} />
                    <input id='input2' type="text" className="accountInput" placeholder={currentUser.lastname} onChange={(e) => setFirstname(e.target.value)} />
                    <input id='input3' type="text" className="accountInput" placeholder={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                    <input id='input4' type="password" className="accountInput" placeholder={currentUser.password} onChange={(e) => setPassword(e.target.value)} />
                    <input id='input5' type="password" className="accountInput" placeholder='Confirmer le mot de passe' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='accountBtn' onClick={modificationClick}>Valider les modifications</button>
                    <button className='accountBtn' onClick={returnClick}>Retour</button>
                </div>}
            {showSuccess &&
                <div className="successRegister">
                    <p className="successText1">Informations modifiées avec succès !</p>
                    <Link className='successLink' onClick={okClick}>Ok !</Link>
                </div>}
        </div>
    );
};

export default UserAccount;
