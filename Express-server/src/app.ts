import express, { Request, Response } from "express";
import router from "./router/router";
import "dotenv/config";

// Instances des dépendances
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

// Middleware pour les CORS
app.use(cors());

// Pour la persistance en JSON
app.use(bodyParser.json());

// Middleware pour req.body.xxx
app.use(express.json());

// A chaque fois que j'interroge app.ts, je passerais par le router
app.use("/", router);

// Définition du port pour le server
app.listen(port, () => {
  console.log(`~~ Le serveur a démarré sur: http://localhost:${port} ~~`);
});
