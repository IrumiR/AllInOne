import express from "express";
import { register, login, registerServiceProvider } from "../Controllers/authController.js";

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/register-service-provider', registerServiceProvider);

export default router;