import User from "../models/users";
import "dotenv/config";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

// Pour la persistance des données en JSON
const { readFileSync, writeFileSync } = require("fs");
let userListJson = JSON.parse(
  readFileSync("./src/assets/userList.json", "utf-8")
);

// Pour mettre à jour la liste JSON
function SaveList() {
  const objectToJson = JSON.stringify(userListJson);
  writeFileSync("./src/assets/userList.json", objectToJson);
  console.log("Données Sauvegardées...");
}

export default class Repository {
  private userList: User[] = userListJson;

  /**
   * Récupère la liste des utilisateurs
   * @returns La liste des utilisateurs
   */
  public getAllUsers = (): User[] => {
    return this.userList;
  };

  /**
   * Récupère un utilisateur grâce à son id
   * @param id L'id qu'on recherche
   * @returns L'utilisateur correspondant à l'id
   */
  public getUserById = (id: number): User => {
    const userFound = this.userList.find((user) => user.id == id)!;
    return userFound;
  };

  /**
   * Récupère un utilisateur grâce à son email
   * @param email L'email qu'on recherche
   * @returns L'utilisateur correspondant à l'email
   */
  public getUserByEmail = (email: string): User => {
    const userFound = this.userList.find((user) => user.email == email)!;
    return userFound;
  };

  public createToken = (userLogged: User): string => {
    const payload: User = userLogged;
    const newToken = jwt.sign(payload, jwt_secret);
    console.log("Token créé: " + newToken);
    return newToken;
  };

  /**
   * Crée un nouvel utilisateur
   * @param newUser L'utilisateur à créer
   * @returns Le dernier utilisateur ajouté à la liste
   */
  public createUser = (newUser: User): User => {
    this.userList.push(newUser);
    SaveList();
    return this.userList[-1];
  };

  /**
   * Modifie les informations d'un utilisateur
   * @param index L'index de l'utilisateur à modifier
   * @param user Les nouvelles informations de l'utilisateur
   * @returns L'utilisateur modifié
   */
  public editUser = (index: number, user: User): User => {
    this.userList[index] = user;
    SaveList();
    return this.userList[index];
  };

  /**
   * Modifie l'état du booleen "banned" d'un utilisateur
   * @param index L'index de l'utilisateur à modifier
   * @param newBanStatus Le nouveau statut du booleen "banned"
   * @returns L'utilisateur modifié
   */
  public banOrUnban = (index: number, newBanStatus: boolean): User => {
    this.userList[index].banned = newBanStatus;
    SaveList();
    return this.userList[index];
  };

  /**
   * Supprime un utilisateur grâce à son index
   * @param index L'index de l'utilisateur à supprimer
   */
  public deleteUser = (index: number): void => {
    this.userList.splice(index, 1);
    SaveList();
  };
}
