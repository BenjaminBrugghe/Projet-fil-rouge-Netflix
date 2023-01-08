export default class User {
  // Attributs
  id!: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  admin: boolean;
  banned: boolean;

  // Constructeur
  constructor(
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.admin = false;
    this.banned = false;
  }
}
