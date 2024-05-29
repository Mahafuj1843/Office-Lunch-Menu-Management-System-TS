import jwt, { Secret }  from "jsonwebtoken";
import prisma from "../config/db"
import { checkHash, makeHash } from "../utils/hash";
import { createError } from './../utils/error';
import { NextFunction, Request, Response } from "express";

interface User{
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}
interface authReq{
    name: string|null; 
    email: string; 
    pass: string
}
const SECRET_KEY: Secret|any = process.env.JWT;
let EmailRegx: any =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const registration = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
    const { name, email, pass }:  authReq = req.body

    try {
        if (!name || !email || !pass)
            return next(createError(400, "Please fill the all requried fields."));

        if(!EmailRegx.test(email))
            return next(createError(400, "Please give a valid email."));

        if (req.body.pass.length < 6 || req.body.pass.length > 12)
            return next(createError(400, "Password must be 6 to 12 characters."));

        const user: User|null = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        // Checking user already register or not.
        if(user) return next(createError(400, "Email already registred."));

        await prisma.users.create({
            data:{
                name: name,
                email: email,
                password: makeHash(pass)
            }
        })
        return res.status(201).send("Registration successfull.")
    } catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
    const { email, pass }: authReq = req.body

    try {
        if (!email || !pass)
            return next(createError(401, "Please fill the all requried fields."));

        if(!EmailRegx.test(email))
            return next(createError(401, "Please give a valid email."));

        const user: any = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        // Checking user password match or not.
        if(!await checkHash(pass, user.password)) 
            return next(createError(400, "Email or Password does not match."));

        // Create JWT token
        const token: string = jwt.sign({ id: user?.id, role: user?.role }, SECRET_KEY, {
            expiresIn: '1 days',
          })

        //Destructring user object for excluding password.
        const { password, updatedAt, ...otherDetails } = user;

        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).json({ token: token, data: {...otherDetails} })
    } catch (err) {
        next(err)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
    try {
        res.cookie("access_token", "", { httpOnly: true, expires: new Date(Date.now()) }).status(200).send("Logout successfully.")
    } catch (err) {
        next(err)
    }
}