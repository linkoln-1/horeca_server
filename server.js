process.on("uncaughtException", (err) => {
  console.error("Неперехваченное исключение:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Неперехваченный отклонённый промис:",
    promise,
    "причина:",
    reason
  );
});
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";
import authProvider from "./middleware/authProvider.js";
import authConsumer from "./middleware/authConsumer.js";

import authProviderRouter from "./routes/authProviderRoutes.js";
import authConsumerRouter from "./routes/authConsumerRoutes.js";
import providerRouter from "./routes/providerRoutes.js";
import consumerRouter from "./routes/consumerRoutes.js";
import authRouter from "./routes/authRouter.js";
import extraRouter from "./routes/extraRouter.js";

import { swaggerSpec } from "./docs/swaggerDef.js";
import path from "path";
import { nanoid } from "nanoid";

// import fs from "fs";

// const customCss = fs.readFileSync(
//   process.cwd() + "/style/custom-swagger-style.css",
//   "utf8"
// );

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads/horeca", express.static(path.join("uploads", "horeca")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

app.use("/api/auth/provider", authProviderRouter);
app.use("/api/auth/consumer", authConsumerRouter);
app.use("/api/auth", authRouter);
app.use("/api/extra", extraRouter);
app.use("/api/provider", authProvider, providerRouter);
app.use("/api/consumer", authConsumer, consumerRouter);

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
