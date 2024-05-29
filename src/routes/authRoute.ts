import { Router } from "express";
import { login, logout, registration } from "../controllers/authController";

const router = Router()

router.route("/register").post(registration);
router.route("/login").post(login);
router.route('/logout').get(logout);

export default router