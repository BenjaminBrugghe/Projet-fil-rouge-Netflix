import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, editUser } from '../Datas/ApiServices';
import axios from 'axios';
import HeaderLogged from '../Components/HeaderLogged';

const UserAccount = () => {

    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [accountForm, setAccountForm] = useState('hiddenClass'); // accountForm
    const [success, setSuccess] = useState('hiddenClass');
    const [showMessage, setShowMessage] = useState('successRegister');

    const _navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentuser] = useState('');

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

    function understoodClick() {
        let currentPw = '';
        let mask = '';

        userList.forEach((el) => {
            if (el.id == localStorage.getItem('userId')) {
                setCurrentuser(el);
                currentPw = el.password;
            }
        });
        setAccountForm('accountForm');
        setShowMessage('hiddenClass');

        // currentPw.forEach((el) => {
        //     mask += "*";
        // })

        // currentPw.map(c => {
        //     mask += "*";
        //     return c;
        // })

        // for (let index = 1; index <= currentUser.password.length; index++) {
        //     // const element = array[index];
        //     mask += "*";            
        // }

        console.log(`*** Mask : ${mask}`);
    };

    function modificationClick(e) {
        e.preventDefault();

        if (password != '' && password != confirmPassword) {
            alert("Erreur ! Les deux mots de passe doivent correspondre")
        }
        else if (password == '' && currentUser.password != confirmPassword) {
            alert("Erreur ! Veuillez confirmer votre mot de passe");
        }
        else {
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
            resetInputs();
            setAccountForm('hiddenClass');
            setSuccess('successRegister');
        }
    };

    function resetInputs() {
        document.querySelector('#input1').value = "";
        document.querySelector('#input2').value = "";
        document.querySelector('#input3').value = "";
        document.querySelector('#input4').value = "";
        document.querySelector('#input5').value = "";
    }

    function returnClick() {
        _navigate(-1);
    };

    function okClick() {
        setAccountForm('accountForm');
        setSuccess('hiddenClass');
    };

    return (
        <div className='userAccount'>
            <HeaderLogged />
            <div className={accountForm}>
                <p className="accountText">Modifier mes infos</p>
                <input id='input1' type="text" className="accountInput" placeholder={currentUser.firstname} onChange={(e) => setLastname(e.target.value)} />
                <input id='input2' type="text" className="accountInput" placeholder={currentUser.lastname} onChange={(e) => setFirstname(e.target.value)} />
                <input id='input3' type="text" className="accountInput" placeholder={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                <input id='input4' type="password" className="accountInput" placeholder={currentUser.password} onChange={(e) => setPassword(e.target.value)} />
                <input id='input5' type="password" className="accountInput" placeholder='Confirmer le mot de passe' onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className='accountBtn' onClick={modificationClick}>Valider les modifications</button>
                <button className='accountBtn' onClick={returnClick}>Retour</button>
            </div>
            <div className={success}>
                <p className="successText1">Informations modifiées avec succès !</p>
                <Link className='successLink' onClick={okClick}>Ok !</Link>
            </div>
            <div className={showMessage}>
                <p className="successText2">Pour modifier vos informations, n'oubliez pas de confirmer votre mot de passe</p>
                <Link className='successLink' onClick={understoodClick}>J'ai compris !</Link>
            </div>
        </div>
    );
};

export default UserAccount;
