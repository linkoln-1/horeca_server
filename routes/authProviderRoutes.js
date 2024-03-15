import express from "express";
const router = express.Router();
import {
  registerProvider,
  // loginProvider,
  remindProvider,
  changePassword,
} from "../controllers/authProviderControllers.js";

router.route("/register").post(registerProvider);
// router.route("/login").post(loginProvider);
router.route("/remind").post(remindProvider);
router.route("/changePassword").post(changePassword);

export default router;
