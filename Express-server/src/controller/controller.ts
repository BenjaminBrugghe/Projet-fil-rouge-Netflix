import { Request, Response } from "express";
import Service from "../service/service";
import User from "../models/users";

export default class Controller {
  // Attributs
  service: Service;

  // Constructeur
  constructor(service: Service) {
    this.service = service;
  }

  // Méthodes

  /**
   * Appelle la méthode getAllUsers du service
   */
  public getAllUsers = (req: Request, res: Response): void => {
    res.send(this.service.getAllUsers());
  };

  /**
   * Récupère l'id de la requête et appelle la méthode getUserById du service
   */
  public getUserById = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.send(this.service.getUserById(+id));
  };

  /**
   * Récupère l'email de la requête et appelle la méthode getUserByEmail du service
   */
  public getUserByEmail = (req: Request, res: Response): void => {
    const email = req.params.email;
    res.send(this.service.getUserByEmail(email));
  };

  /**
   * Récupère les informations de la requête et appelle la méthode createToken du service
   */
  public createToken = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const token = await this.service.createToken(email, password);
      res.send(token);
    } catch (error) {
      res.send(error);
    }
  };

  /**
   * Récupère le token de la requête et appelle la méthode verifyToken du service
   */
  public verifyToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization!;
    try {
      const result = await this.service.verifyToken(token);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };

  /**
   * Récupère les informations de la requête et appelle la méthode createUser du service
   */
  public createUser = (req: Request, res: Response): void => {
    const lastname: string = req.body.lastname;
    const firstname: string = req.body.firstname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser = this.service.createUser(
      lastname,
      firstname,
      email,
      password
    );
    res.send(newUser);
  };

  /**
   * Récupère les informations de la requête et appelle la méthode editUser du service
   */
  public editUser = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const lastname: string = req.body.lastname;
    const firstname: string = req.body.firstname;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser = this.service.editUser(
      +id,
      lastname,
      firstname,
      email,
      password
    );
    res.send(newUser);
  };

  /**
   * Récupère l'id et l'état du booléen "banned" de la requête et appelle la méthode banOrUnban du service
   */
  public banOrUnban = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const userModified = this.service.banOrUnban(+id);
    res.send(userModified);
  };

  /**
   * Récupère l'id de la requête et appelle la méthode deleteUser du service
   */
  public deleteUser = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    this.service.deleteUser(+id);
    res.send(id);
  };
}
