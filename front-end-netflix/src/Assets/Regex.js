// Regex pour les inputs
const regexName = /^[a-zA-ZÀ-ÿ\s\-]{3,}$/; // 3 caractères minimum, lettres, espaces et tirets
const regexEmail = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/; // Format email
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; // 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial


export default class Regex {

    /**
     * Vérifie que le nom contient au moins 3 caractères et pas de nombres
     */
    checkLastnameRegex = (lastname) => {
        if (regexName.test(lastname)) {
            return true;
        }
    };

    /**
     * Vérifie que le prénom contient au moins 3 caractères et pas de nombres
    */
    checkFirstnameRegex = (firstname) => {
        if (regexName.test(firstname)) {
            return true;
        }
    };

    /**
     * Vérifie que l'email est au bon format
    */
    checkEmailRegex = (email) => {
        if (regexEmail.test(email)) {
            return true;
        }
    };

    /**
     * Vérifie que le mot de passe contient au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
    */
    checkPasswordRegex = (password) => {
        if (regexPassword.test(password)) {
            return true;
        }
    };

    /**
     * Vérifie que les 2 mots de passe correspondent
    */
    checkConfirmPasswordRegex = (password, confirmPassword) => {
        if (password == confirmPassword) {
            return true;
        }
    };
}