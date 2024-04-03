import express from "express";
const router = express.Router();
import {
  verificationProvider,
  editMainInfo,
} from "../controllers/providerControllers.js";

router.route("/verification").post(verificationProvider);

router.route("/edit_main_info").post(editMainInfo);

export default router;
