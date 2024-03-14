import express from "express";
const router = express.Router();
import { verificationProvider } from "../controllers/providerControllers.js";

router.route("/verification").post(verificationProvider);

export default router;
