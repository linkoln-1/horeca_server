import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Provider from "../models/Provider.js";
import Consumer from "../models/Consumer.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  let consumer;
  let provider;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Укажите Email и пароль",
    });
  }

  consumer = await Consumer.findOne({ email });
  if (!consumer) {
    provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Не корректные данные",
      });
    }
  }

  if (consumer) {
    const isPasswordCorrect = await consumer.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Не корректные данные",
      });
    }

    const token = consumer.createJWT();

    res.status(StatusCodes.OK).json({
      consumer: {
        email: consumer.email,
        phone: consumer.phone,
        companyName: consumer.companyName,
        deliveryAddress: consumer.deliveryAddress,
        deliveryTime: consumer.deliveryTime,
        isVerificated: consumer.isVerificated,
        inn: consumer.inn,
        _id: consumer._id,
      },
      token,
    });
  } else if (provider) {
    const isPasswordCorrect = await provider.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Не корректные данные",
      });
    }

    const token = provider.createJWT();

    res.status(StatusCodes.OK).json({
      provider: {
        email: provider.email,
        phone: provider.phone,
        companyName: provider.companyName,
        productCategory: provider.productCategory,
        minOrder: provider.minOrder,
        deliveryMethod: provider.deliveryMethod,
        _id: provider._id,
        inn: provider.inn,
      },
      token,
    });
  }
};

export { login };
