// Regex pour les inputs
const regexName = /^[a-zA-ZÀ-ÿ\s\-]{3,}$/; // 3 caractères minimum, lettres, espaces et tirets
const regexEmail = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/; // Format email
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/; // 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial

/**
     * Vérifie que le nom contient au moins 3 caractères et pas de nombres
     */
export const checkLastnameRegex = (lastname) => {
    if (regexName.test(lastname)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Vérifie que le prénom contient au moins 3 caractères et pas de nombres
 */
export const checkFirstnameRegex = (firstname) => {
    if (regexName.test(firstname)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Vérifie que l'email est au bon format
 */
export const checkEmailRegex = (email) => {
    if (regexEmail.test(email)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Vérifie que le mot de passe contient au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial
 */
export const checkPasswordRegex = (password) => {
    if (regexPassword.test(password)) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Vérifie que le 2ème mot de passe correspond au 1er
 */
export const checkConfirmPasswordRegex = (confirmPassword) => {
    if (regexPassword.test(confirmPassword)) {
        return true;
    }
    else {
        return false;
    }
};