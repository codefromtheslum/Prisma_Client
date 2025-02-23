import express, { Express } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
env.config();


const app: Express = express();
const port: number = parseInt(process.env.PORT!) || 1234;

mainApp(app)
const server = app.listen(port, () => {
    console.log(`❤️  ❤️`)
})

process.on("uncaughtException", (error: any) => {
    console.log(`Server is shutting down due to an uncaught exception : ${error?.message}`)

    process.exit(0)
})

process.on("unhandledRejection", (reason: any) => {
    console.log(`Server is shutting down due to an uncaught exception : ${reason?.message}`)

    server.close(() => {
        process.exit(0)
    })
})