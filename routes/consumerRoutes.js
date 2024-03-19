import express from "express";
const router = express.Router();
import {
  verificationConsumer,
  newOrder,
} from "../controllers/consumerControllers.js";
import fileUpload from "../middleware/file-upload.js";

router.route("/verification").post(verificationConsumer);
// router.route("/neworder").post(fileUpload.single("image"), newOrder);
router.post("/neworder", fileUpload.array("images", 5), newOrder);

export default router;
