import express from "express";
const router = express.Router();
import { registerProvider } from "../controllers/authProviderControllers.js";

router.route("/register").post(registerProvider);

export default router;
