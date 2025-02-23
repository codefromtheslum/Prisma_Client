import express from "express";
import { createAccount, getAllAccount, loginAccount } from "../controllers/authController";

const router = express.Router();
router.route("/").post(createAccount);
router.route("/login").post(loginAccount)
router.route("/accounts").get(getAllAccount)


export default router