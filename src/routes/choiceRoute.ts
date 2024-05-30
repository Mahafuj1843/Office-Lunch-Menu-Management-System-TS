import { Router } from "express";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware";
import { allChoices, createChoice, myChoices } from "../controllers/choiceController";

const router: Router = Router()

router.route("/create").post(verifyToken, createChoice);
router.route("/").get(verifyToken, isAdmin, allChoices);
router.route("/my").get(verifyToken, myChoices);

export default router