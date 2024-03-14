import express from "express";
const router = express.Router();
import {
  registerConsumer,
  loginConsumer,
  remindConsumer,
} from "../controllers/authConsumerControllers.js";

router.route("/register").post(registerConsumer);
router.route("/login").post(loginConsumer);
router.route("/remind").post(remindConsumer);

export default router;
