import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import authProviderRouter from "./routes/authProviderRoutes.js";
import authConsumerRouter from "./routes/authConsumerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "welcom" });
});

app.use("/api/auth/provider", authProviderRouter);
app.use("/api/auth/consumer", authConsumerRouter);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/horeca`
  )
  .then(() => {
    app.listen(1000);
    console.log("Server has been started, DB connected");
  })
  .catch((err) => {
    console.log(err);
  });