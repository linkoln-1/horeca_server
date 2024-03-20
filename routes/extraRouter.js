import express from "express";
const router = express.Router();
import { getAllProduct } from "../controllers/extraControllers.js";

router.route("/allProducts").get(getAllProduct);

export default router;
