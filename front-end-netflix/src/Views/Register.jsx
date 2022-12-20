import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { createUser, getAllUsers } from '../Datas/ApiServices';

const Register = () => {

    const [userList, setUserList] = useState([]);

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false); // 'successRegister'
    const _navigate = useNavigate();

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

        console.log(`*****${userList}*****`); // Affiche [object Object],[object Object]

        // Pour vérifier si tous les champs sont remplis
        if (lastname != '' && firstname != '' && email != '' && password != '' && confirmPassword != '') {
            userList.foreach((el) => {
                if (email == el.email) { // Pour vérifier que l'adresse email n'est pas déjà utilisée => ERREUR (not a function)
                    alert('Erreur ! Cette adresse email est déjà associée à un compte !');
                }
                else {
                    if (password != confirmPassword) {
                        alert('Erreur ! Les deux mots de passe doivent correspondre');
                    }
                    else {
                        const newUser = {
                            lastname: lastname,
                            firstname: firstname,
                            email: email,
                            password: password
                        }
                        createUser(newUser);
                        registerSuccess();
                    }
                }
            })
        }
        else {
            alert('Erreur ! Veuillez remplir tout les champs');
        }
    };

    // document.addEventListener("keyup", function (event) {
    //     if (event.key === "Enter") {
    //         if (success == 'hiddenClass') {
    //             registerClick();
    //         }
    //         else if (success == 'successRegister') {
    //             _navigate('/login');
    //         }
    //     }
    // });

    console.log(userList);

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
            {showSuccess &&
                <div className="successRegister">
                    <p className="successText1">Votre compte a été créé avec succès !</p>
                    <p className="successText2">Connectez vous dès maintenant !</p>
                    <Link to='/login' className='successLink'>S'identifier</Link>
                </div>
            }
        </div>
    );
};

export default Register;
