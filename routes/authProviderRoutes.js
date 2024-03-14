import express from "express";
const router = express.Router();
import {
  registerProvider,
  loginProvider,
  remindProvider,
} from "../controllers/authProviderControllers.js";

router.route("/register").post(registerProvider);
router.route("/login").post(loginProvider);
router.route("/remind").post(remindProvider);

export default router;
