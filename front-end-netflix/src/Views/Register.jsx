import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getAllUsers, createUser } from '../Assets/ApiServices';
import RegisterPopUp from '../Components/RegisterPopUp';
import { checkLastnameRegex, checkFirstnameRegex, checkEmailRegex, checkPasswordRegex, checkConfirmPasswordRegex } from '../Assets/Regex';

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

    // Pour vérifier que l'email n'est pas déjà utilisé
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(true);

    /**
     * Récupère la liste des utilisateurs
     */
    useEffect(() => {
        setUserList(getAllUsers());
        console.table(userList);
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
        setLastnameRegexOK(checkLastnameRegex(lastname));
        setFirstnameRegexOK(checkFirstnameRegex(firstname));
        setEmailRegexOK(checkEmailRegex(email));
        setPasswordRegexOK(checkPasswordRegex(password));
        setConfirmPassWordRegexOk(checkConfirmPasswordRegex(confirmPassword));

        // Vérifie que l'addresse email n'est pas déjà utilisée
        userList.map((user) => {
            if (user.email == email) {
                return alert('Erreur ! Cette adresse email est déjà utilisée');
            }
            else {
                return setEmailAlreadyUsed(false);
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
                else {
                    switch (false) {
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
                }
            }
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
