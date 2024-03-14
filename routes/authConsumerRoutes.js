import express from "express";
const router = express.Router();
import {
  registerConsumer,
  loginConsumer,
  remindConsumer,
  changePassword,
} from "../controllers/authConsumerControllers.js";

router.route("/register").post(registerConsumer);
router.route("/login").post(loginConsumer);
router.route("/remind").post(remindConsumer);
router.route("/changePassword").post(changePassword);

export default router;
