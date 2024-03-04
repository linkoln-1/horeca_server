import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Consumer from "../models/Consumer.js";

const registerConsumer = async (req, res) => {
  try {
    const {
      email,
      password,
      companyName,
      inn,
      productCategory,
      deliveryAddress,
      deliveryTime,
    } = req.body;
    console.log(req.body);
    if (!email || !password) {
      throw new BadRequestError("Введите все значения");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Некорректный формат электронной почты");
    }

    const consumerAlreadyExist = await Consumer.findOne({ email });
    if (consumerAlreadyExist) {
      throw new BadRequestError("Email уже используется");
    }

    const consumer = await Consumer.create({
      email,
      password,
      companyName,
      productCategory,
      deliveryAddress,
      deliveryTime,
      inn,
    });
    const token = consumer.createJWT();
    res.status(StatusCodes.CREATED).json({
      consumer: {
        email: consumer.email,
        companyName: consumer.companyName,
        productCategory: consumer.productCategory,
        deliveryAddress: consumer.deliveryAddress,
        deliveryTime: consumer.deliveryTime,
        inn: consumer.inn,
        _id: consumer._id,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export { registerConsumer };
