import express from "express";
import Repository from "../repository/repository";
import Service from "../service/service";
import Controller from "../controller/controller";
import { cp } from "fs";

// Instances de classes
const repo = new Repository();
const service = new Service(repo);
const controller = new Controller(service);
const router = express.Router();

// Routes
router.get("/Users", controller.getAllUsers);
router.get("/Users/:id", controller.getUserById);
router.get("/Users/login/:email", controller.getUserByEmail);
router.post("/Users", controller.createUser);
router.post("/Users/token", controller.createToken);
router.put("/Users/:id", controller.editUser);
router.patch("/Users/ban/:id", controller.banOrUnban);
router.delete("/Users/:id", controller.deleteUser);

export default router;
