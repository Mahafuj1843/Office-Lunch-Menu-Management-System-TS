import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from'express-rate-limit'
import helmet from'helmet'
import hpp from'hpp'
import routes from './routes/indexRoute'

const app = express()

app.use(cors())
app.use(helmet())
app.use(hpp())
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))

// All routes
app.use(routes)

app.use((err: any, req: Request, res: Response, next: NextFunction): any=>{
    const errorStatus: any = err.status || 500
    const errorMessage: string = err.message || "Something wents wrong."
    return res.status(errorStatus).json({
      success : false,
      status : errorStatus,
      message : errorMessage,
      stack : err.stack,
    });
  });

export default app