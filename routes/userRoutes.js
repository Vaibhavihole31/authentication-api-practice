import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";

router.post('/register', UserController.UserRegistration)

export default router