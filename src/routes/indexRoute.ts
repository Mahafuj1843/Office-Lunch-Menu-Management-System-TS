import { Router } from "express";
import authRoutes from "./authRoute"
import menuRoutes from "./menuRoute"

const router: Router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/menu', menuRoutes)

export default router