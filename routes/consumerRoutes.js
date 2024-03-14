import express from "express";
const router = express.Router();
import { verificationConsumer } from "../controllers/consumerControllers.js";

router.route("/verification").post(verificationConsumer);

export default router;
