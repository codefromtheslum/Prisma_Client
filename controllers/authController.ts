import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();


// Creating account
export const createAccount = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const findUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (findUser) {
            return res.status(403).json({
                message: "Account with email address already exists!"
            })
        }

        // const genSalt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, genSalt)

        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        const { password: _, ...newUser } = user

        return res.status(201).json({
            message: "Account created successfully",
            data: newUser
        })

    } catch (error: any) {
        return res.status(500).json({
            message: "Error creating account",
            data: error?.message
        })
    }
}

// Login Account
export const loginAccount = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            return res.status(404).json({
                message: "Account with email does not exist"
            })
        }

        if (user) {
            const checkPassword = await bcryptjs.compare(password, user?.password || "");

            if (checkPassword) {
                return res.status(200).json({
                    message: "Login successful"
                })
            } else {
                return res.status(403).json({
                    message: "Incorrect password"
                })
            }
        } else {
            return res.status(400).json({
                message: "Incorrect login credentials"
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            message: "Error login account",
            data: error?.message
        })
    }
}

export const getAllAccount = async (req: Request, res: Response): Promise<any> => {
    try {

        const users = await prisma.user.findMany()

        return res.status(200).json({
            message: "Accounts retrieved",
            data: users
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error getting all accounts",
            data: error?.message
        })
    }
}