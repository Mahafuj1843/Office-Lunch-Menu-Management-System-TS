import { Router } from "express";
import authRoutes from "./authRoute"

const router: Router = Router()

router.use('/api/auth', authRoutes)

export default router