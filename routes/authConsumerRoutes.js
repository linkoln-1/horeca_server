import express from "express";
const router = express.Router();
import { registerConsumer } from "../controllers/authConsumerControllers.js";

router.route("/register").post(registerConsumer);

export default router;
