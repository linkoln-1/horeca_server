import express from "express";
const router = express.Router();
import {
  verificationProvider,
  editMainInfo,
  editExtraInfo,
} from "../controllers/providerControllers.js";

router.route("/verification").post(verificationProvider);

router.route("/edit_main_info").post(editMainInfo);
router.route("/edit_extra_info").post(editExtraInfo);

export default router;
