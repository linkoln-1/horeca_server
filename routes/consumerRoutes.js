import express from "express";
const router = express.Router();
import {
  verificationConsumer,
  newOrder,
  getAllOrdersByConsumerId,
  editMainInfo,
  newTemplate,
} from "../controllers/consumerControllers.js";
import fileUpload from "../middleware/file-upload.js";

router.route("/verification").post(verificationConsumer);

router.post("/neworder", fileUpload.array("images", 5), newOrder);

router.route("/allOrders/:consumerId").get(getAllOrdersByConsumerId);

router.route("/edit_main_info").post(editMainInfo);

router.post("/newtemplate", fileUpload.array("images", 5), newTemplate);

export default router;
