import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index-error.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.consumer = { consumerId: payload.consumerId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication error");
  }
};
export default auth;


