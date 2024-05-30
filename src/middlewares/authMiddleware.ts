import jwt, { Secret } from 'jsonwebtoken'
import { createError } from '../utils/error'
import { NextFunction, Request, Response } from 'express';

const SECRET_KEY: Secret | any = process.env.JWT

export const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
    //   const token: string|null = req.headers.token;
    const token = req.cookies.access_token

    if (!token) return next(createError(401, "You are not authenticated."));
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) return next(createError(401, "Token is not authorized."));
        req.user = user;
        next();
    });
}

// Checking authticate user is admin or not.
export const isAdmin = (req: Request | any, res: Response, next: NextFunction) => {
    verifyToken(req, res, next)
    if (req.user.role === "ADMIN") {
        return next()
    }

    return next(createError(401, "You are not authorized."));
}