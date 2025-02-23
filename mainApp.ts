import { Application, json, Request, Response } from "express";
import cors from "cors";
import auth from "./routes/authRoutes"
import post from "./routes/postRoutes"


export const mainApp = (app: Application) => {
    app.use(json());
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"]
    }))
    app.get("/", (req: Request, res: Response) => {
        res.send("Initialized!!")
    })
    app.use("/auth", auth)
    app.use("/post", post)
}