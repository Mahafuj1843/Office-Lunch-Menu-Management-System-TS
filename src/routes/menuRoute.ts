import { Router } from "express";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware";
import { allMenus, createMenu, deleteMenu, menuList, singleMenus, updateMenu } from "../controllers/menuController";

const router: Router = Router()

router.route("/create").post(verifyToken, isAdmin, createMenu);
router.route("/").get(allMenus);
router.route("/:id").get(verifyToken, singleMenus);
router.route("/:id").put(verifyToken, isAdmin, updateMenu);
router.route("/:id").delete(verifyToken, isAdmin, deleteMenu);
router.route("/all/list").get(verifyToken, isAdmin, menuList);

export default router