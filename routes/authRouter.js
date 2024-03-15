import express from "express";
const router = express.Router();
import { login } from "../controllers/authController.js";

router.route("/login").post(login);

export default router;
