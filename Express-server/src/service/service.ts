import User from "../models/users";
import Repository from "../repository/repository";

// Pour la persistance des données en JSON
const { readFileSync } = require("fs");
let userListJson = JSON.parse(
  readFileSync("./src/assets/userList.json", "utf-8")
);

/**
 * Génère une ID unique (qui sera la plus grande déjà existante + 1)
 * @param userList La liste des utilisateurs
 * @returns Une nouvelle ID unique
 */
const getUniqueId = (userList: User[]): number => {
  const userIds = userList.map((user) => user.id);
  const maxId = userIds.reduce((acc, b) => Math.max(acc, b));
  const IdUnique = maxId + 1;
  return IdUnique;
};

export default class Service {
  // Attributs
  repo: Repository;

  // Constructeur
  constructor(repo: Repository) {
    this.repo = repo;
  }

  // Méthodes

  /**
   * Appelle la méthode getAllUsers du repository
   * @returns La liste des utilisateurs
   */
  public getAllUsers = (): User[] => {
    return this.repo.getAllUsers();
  };

  /**
   * Appelle la méthode getUserById du repository
   * @param id L'id de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'id
   */
  public getUserById = (id: number): User => {
    const result = this.repo.getUserById(id);
    if (!result) throw "Erreur, id introuvable.";
    return result;
  };

  /**
   * Appelle la méthode getUserByEmail du repository
   * @param email L'email de l'utilisateur à récupérer
   * @returns L'utilisateur correspondant à l'email
   */
  public getUserByEmail = (email: string): User => {
    const result = this.repo.getUserByEmail(email);
    if (!result) throw "Erreur, email introuvable.";
    return result;
  };

  /**
   * Vérifie si les informations de connexion sont correctes et appelle la méthode createToken du repository
   * @param email L'email saisi par l'utilisateur
   * @param password Le mot de passe saisi par l'utilisateur
   * @returns Le token de l'utilisateur
   */
  public createToken = async (
    email: string,
    password: string
  ): Promise<string> => {
    // Je récupère l'utilisateur correspondant à l'email
    const userFound = await this.getUserByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!userFound) throw "Erreur, email incorrect.";

    // Si les 2 mots de passe ne correspondent pas
    if (userFound.password != password) throw "Erreur, mot de passe incorrect.";

    const newToken = this.repo.createToken(userFound);
    return newToken;
  };

  /**
   * Vérifie si le token est correct et appelle la méthode verifyToken du repository
   * @param token Le token de l'utilisateur
   * @returns L'utilisateur correspondant au token
   */
  public verifyToken = async (token: string): Promise<User> => {
    const userFound = this.repo.verifyToken(token);
    if (!userFound) throw "Erreur, token invalide.";
    return userFound;
  };

  /**
   * Appelle la méthode createUser du repository
   * @param lastname Le nom de l'utilisateur à créer
   * @param firstname Le prénom de l'utilisateur à créer
   * @param email L'email de l'utilisateur à créer
   * @param password Le mot de passe de l'utilisateur à créer
   * @returns Un nouvel utilisateur
   */
  public createUser = (
    lastname: string,
    firstname: string,
    email: string,
    password: string
  ): User => {
    userListJson = JSON.parse(
      readFileSync("./src/assets/userList.json", "utf-8")
    );
    const uniqueId = getUniqueId(userListJson);
    const newUser = new User(uniqueId, lastname, firstname, email, password);
    this.repo.createUser(newUser);
    return newUser;
  };

  /**
   * Appelle la méthode editUser du repository
   * @param id L'id de l'utilisateur à modifier
   * @param lastname Le nouveau nom
   * @param firstname Le nouveau prénom
   * @param email Le nouvel email
   * @param password Le nouveau mot de passe
   * @returns L'utilisateur modifié
   */
  public editUser = (
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string
  ): User => {
    const index = this.repo.getAllUsers().indexOf(this.getUserById(id));
    if (index.toString() == "") throw "Erreur, id introuvable.";

    const userToUpdate = this.repo.getAllUsers()[index];
    userToUpdate.lastname = lastname;
    userToUpdate.firstname = firstname;
    userToUpdate.email = email;
    userToUpdate.password = password;

    this.repo.editUser(index, userToUpdate);
    return userToUpdate;
  };

  /**
   * Récupère l'index de l'utilisateur à modifier et appelle la méthode banOrUnban du repository
   * @param id L'id de l'utilisateur à bannir ou débannir
   * @param newBanStatus Le nouveau statut du booléen
   */
  public banOrUnban = (id: number): User => {
    const index = this.repo.getAllUsers().indexOf(this.getUserById(id));
    if (index.toString() == "") throw "Erreur, id introuvable.";
    const userModified = this.repo.banOrUnban(index);
    return userModified;
  };

  /**
   * Appelle la méthode checkBanStatus du repository
   * @param email L'email de l'utilisateur à vérifier
   * @returns Le statut du booléen de l'utilisateur
   */
  public checkBanStatus = (email: string): string => {
    const response = this.repo.checkBanStatus(email);
    if (!response) throw "Erreur, email introuvable.";
    return response;
  };

  /**
   * Appelle la méthode deleteUser du repository
   * @param id L'id de l'utilisateur à supprimer
   */
  public deleteUser = (id: number) => {
    const index = this.repo.getAllUsers().indexOf(this.getUserById(id));
    if (index.toString() == "") throw "Erreur, id introuvable.";
    this.repo.deleteUser(index);
  };
}
