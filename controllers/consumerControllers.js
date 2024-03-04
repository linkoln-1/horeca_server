import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Consumer from "../models/Consumer.js";

const verificationConsumer = async (req, res) => {
  console.log(req.body);
  try {
    const { code, consumerId } = req.body;
    if (!code || !consumerId) {
      throw new UnAuthenticatedError(
        "Укажите код, который был Вам отправлен на Email"
      );
    }
    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      throw new UnAuthenticatedError("Ошибка, попробуйте позднее");
    }
    if (consumer.code !== code) {
      throw new UnAuthenticatedError("Код указан не верно!");
    }
    consumer.isVerificated = true;
    await consumer.save();

    res.status(StatusCodes.CREATED).json({
      consumer: {
        email: consumer.email,
        companyName: consumer.companyName,
        productCategory: consumer.productCategory,
        deliveryAddress: consumer.deliveryAddress,
        deliveryTime: consumer.deliveryTime,
        inn: consumer.inn,
        isVerificated: consumer.isVerificated,
        _id: consumer._id,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export { verificationConsumer };
