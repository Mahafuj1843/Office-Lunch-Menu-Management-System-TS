import { Router } from "express";
import authRoutes from "./authRoute"
import menuRoutes from "./menuRoute"
import choiceRoutes from "./choiceRoute"

const router: Router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/menu', menuRoutes)
router.use('/api/choice', choiceRoutes)

export default router