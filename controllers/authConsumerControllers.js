import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Consumer from "../models/Consumer.js";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import { sendRemindEmail } from "../utils/emailReminder.js";
import cryptoRandomString from "crypto-random-string";

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

    const code = cryptoRandomString({ length: 6, type: "numeric" });

    const consumer = await Consumer.create({
      email,
      password,
      companyName,
      productCategory,
      deliveryAddress,
      deliveryTime,
      inn,
      code,
    });

    const token = consumer.createJWT();

    await sendVerificationEmail(consumer.email, consumer.code);

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

const loginConsumer = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Укажите Email и пароль",
    });
  }

  const consumer = await Consumer.findOne({ email });
  if (!consumer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Не корректные данные",
    });
  }

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
      companyName: consumer.companyName,
      productCategory: consumer.productCategory,
      deliveryAddress: consumer.deliveryAddress,
      deliveryTime: consumer.deliveryTime,
      isVerificated: consumer.isVerificated,
      inn: consumer.inn,
      _id: consumer._id,
    },
    token,
  });
};

const remindConsumer = async (req, res) => {
  // try {
  const { email } = req.body;
  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Укажите все данные",
    });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw new BadRequestError("Некорректный формат электронной почты");
  }

  const consumer = await Consumer.findOne({ email });
  if (!consumer) {
    return res.status(404).json({
      message: "Указанный Email не зарегистрирован",
    });
  }

  const { newPassword } = await sendRemindEmail(email);

  consumer.password = newPassword;
  await consumer.save();
  return res.status(StatusCodes.CREATED).json({
    message: "Новый пароль сгенерирован и отправлен Вам на почту",
  });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(StatusCodes.BAD_REQUEST).json({
  //     message: "Не корректные данные",
  //   });
  // }
};

export { registerConsumer, loginConsumer, remindConsumer };
