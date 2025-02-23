import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import { uploadImages } from "../config/streamifier";
import { streamUpload } from "../middleware/uploadOneImage";


const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        const { text } = req.body

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return res.status(404).json({
                message: "Account not found or does not exist"
            })

        }

        // const imageUrl: any = await uploadImages(req.files as Express.Multer.File[])
        const imageUrl: any = await streamUpload(req)

        const post = await prisma.post.create({
            data: {
                userId,
                text,
                image: imageUrl
            },
            include: {
                User: {
                    select: {
                        email: true,
                    }
                }
            }
        })


        return res.status(201).json({
            message: "Post created successfully",
            data: post
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error creating post",
            data: error?.message
        })
    }
}

export const updatePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postId, userId } = req.params;
        const { text } = req.body;

        const user = await prisma.user.findUnique({ where: { id: userId } })

        const post = await prisma.post.findUnique({ where: { id: postId } })


        if (!user || !post) {
            return res.status(400).json({
                message: "userId && postId are required"
            })
        }

        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Access unathorized!!"
            })
        }


        // const imageUrl = await uploadImages(req.files as Express.Multer.File[])
        const imageUrl = await streamUpload(req)

        const newPost = await prisma.post.update({
            where: { id: postId },
            data: {
                text,
                image: imageUrl
            }
        })

        return res.status(200).json({
            message: "Post updated successfully",
            data: newPost
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Error updating post",
            data: error?.message
        })
    }
}

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postId, userId } = req.params;

        const user = await prisma.user.findUnique({ where: { id: userId } })

        const post = await prisma.post.findUnique({ where: { id: postId } })


        if (!user || !post) {
            return res.status(400).json({
                message: "userId && postId are required"
            })
        }

        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Access unathorized!!"
            })
        }

        await prisma.post.delete({ where: { id: postId } })

        return res.status(200).json({
            message: "Post deleted successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            message: "Error updating post",
            data: error?.message
        })
    }
}

