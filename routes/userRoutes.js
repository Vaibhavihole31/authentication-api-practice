import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from './../middleware/authmiddleware.js'

//route level middleware = to protect route

router.use('/changePassword', checkUserAuth)

router.post('/register', UserController.UserRegistration)
router.post('/login', UserController.userLogin)


//this route is used after login
router.post('/changePassword', UserController.changeUserPassword)

export default router