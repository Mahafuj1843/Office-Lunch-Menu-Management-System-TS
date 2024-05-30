import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/error";
import prisma from "../config/db";

interface menuReq {
    title: string,
    desc: string,
    mDate: string,
    extras: string[]
}
interface Menu {
    id: number,
    title: string,
    desc: string,
    date: Date,
    extras: string[],
    createdAt: Date,
    updatedAt: Date
}
interface ListMenu {
    id: number,
    title: string,
    desc: string,
    date: Date,
    createdAt: Date,
}

export const createMenu = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { title, desc, mDate, extras }: menuReq = req.body
    try {
        if (!title || !desc || !mDate)
            return next(createError(400, "Please fill the all requried fields."));

        const newMenu: Menu = await prisma.menus.create({
            data: {
                title: title,
                desc: desc,
                date: new Date(mDate),
                extras: extras
            }
        })

        const { date, createdAt, updatedAt, ...otherDetails } = newMenu;

        return res.status(201).json({ data: { ...otherDetails } })
    } catch (err) {
        next(err)
    }
}

export const allMenus = async (req: Request | any, res: Response, next: NextFunction): Promise<any> => {
    const pageNo: number = req.query.page > 0 ? req.query.page : 1;
    const perPage: number = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip: number = (pageNo - 1) * perPage;
    let menus: ListMenu[], totalMenus: number

    // Get today's date at the start of the day (00:00:00)
    const startOfDay: Date = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get today's date at the end of the day (23:59:59.999)
    const endOfDay: Date = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
        if (req.query.querys.length) {
            menus = await prisma.menus.findMany({
                where: {
                    AND: [
                        {
                            title: {
                                search: req.query.querys
                            }
                        },
                        {
                            date: {
                                gte: startOfDay,
                                lte: endOfDay
                            },
                        },
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    date: true,
                    desc: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    AND: [
                        {
                            title: {
                                search: req.query.querys
                            }
                        },
                        {
                            date: {
                                gte: startOfDay,
                                lte: endOfDay
                            }
                        },
                    ]
                },
            })
        } else {
            menus = await prisma.menus.findMany({
                where: {
                    date: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    date: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    date: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
            })
        }

        return res.status(200).json({ data: menus, totalMenus })
    } catch (error) {
        next(error)
    }
}

export const singleMenus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const menu: Menu|null = await prisma.menus.findFirst({
            where: {
                id: Number(req.params.id)
            },
            select: {
                id: true,
                title: true,
                desc: true,
                date: true,
                extras: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return res.status(200).json({ data: menu })
    } catch (error) {
        next(error)
    }
}

export const menuList = async (req: Request|any, res: Response, next: NextFunction): Promise<any> => {
    const pageNo: number = req.query.page > 0 ? req.query.page : 1;
    const perPage: number = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip: number = (pageNo - 1) * perPage;
    let menus: ListMenu[], totalMenus: number

    try {
        if (req.query.querys?.length) {
            menus = await prisma.menus.findMany({
                where: {
                    title: {
                        search: req.query.querys
                    }
                },
                select: {
                    id: true,
                    title: true,
                    date: true,
                    desc: true,
                    createdAt: true,
                },
                orderBy: {
                    date: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    title: {
                        search: req.query.querys
                    }
                },
            })
        } else {
            menus = await prisma.menus.findMany({
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    date: true,
                    createdAt: true,
                },
                orderBy: {
                    date: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count()
        }

        return res.status(200).json({ data: menus, totalMenus })
    } catch (error) {
        next(error)
    }
}

export const updateMenu = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { title, desc, mDate, extras }: menuReq = req.body

    try {
        const menu: Menu = await prisma.menus.update({
            where: {
                id: Number(req.params.id)
            },
            data: { title, desc, date: new Date(mDate), extras }
        })
        return res.status(200).json({ data: menu, msg: "Menu updated successfully." })

    } catch (error) {
        next(error)
    }
}

export const deleteMenu = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const menu: Menu = await prisma.menus.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(200).json({ msg: "Menu delete successfully." })
    } catch (error) {
        next(error)
    }
}

