import express, { Request, Response } from "express";
import router from "./router/router";

import "dotenv/config";
const bodyParser = require("body-parser");

// Instance d'Express
const app = express();

// Instance d'une variable d'environnement
const port = process.env.PORT;

// Pour la persistance en JSON
app.use(bodyParser.json());

// Middleware pour req.body.xxx (à mettre avant les autres app.use)
app.use(express.json());

// A chaque fois que j'interroge app.ts, je passerais par le router
app.use("/", router);

// Définition du port pour le server
app.listen(port, () => {
  console.log(`~~ Le serveur a démarré sur: http://localhost:${port} ~~`);
});
