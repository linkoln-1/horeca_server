import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Product from "../models/Product.js";

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.CREATED).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export { getAllProduct };
