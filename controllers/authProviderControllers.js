import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Provider from "../models/Provider.js";
import Consumer from "../models/Consumer.js";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import { sendRemindEmail } from "../utils/emailReminder2.js";
import cryptoRandomString from "crypto-random-string";

const registerProvider = async (req, res) => {
  try {
    const {
      email,
      password,
      phone,
      companyName,
      productCategory,
      minOrder,
      deliveryMethod,
      inn,
    } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Введите все значения");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Некорректный формат электронной почты");
    }

    const innAlreadyExist = await Provider.findOne({ inn });
    if (innAlreadyExist) {
      throw new BadRequestError("ИНН уже используется");
    }

    const providerAlreadyExist = await Provider.findOne({ email });
    if (providerAlreadyExist) {
      throw new BadRequestError("Email уже используется");
    }

    const consumerAlreadyExist = await Consumer.findOne({ inn });
    if (consumerAlreadyExist) {
      throw new BadRequestError("Данный ИНН уже зарегистрирован у общепита");
    }
    const consumerAlreadyExist2 = await Consumer.findOne({ email });
    if (consumerAlreadyExist2) {
      throw new BadRequestError("Данная почта уже используется");
    }

    const code = cryptoRandomString({ length: 6, type: "numeric" });

    const provider = await Provider.create({
      email,
      password,
      phone,
      companyName,
      productCategory,
      minOrder,
      deliveryMethod,
      inn,
      code,
    });

    const token = provider.createJWT();

    await sendVerificationEmail(provider.email, provider.code);

    res.status(StatusCodes.CREATED).json({
      provider: {
        email: provider.email,
        phone: provider.phone,
        companyName: provider.companyName,
        productCategory: provider.productCategory,
        minOrder: provider.minOrder,
        deliveryMethod: provider.deliveryMethod,
        isVerificated: provider.isVerificated,
        _id: provider._id,
        inn: provider.inn,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

// const loginProvider = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       message: "Укажите Email и пароль",
//     });
//   }

//   const provider = await Provider.findOne({ email });
//   if (!provider) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       message: "Не корректные данные",
//     });
//   }

//   const isPasswordCorrect = await provider.comparePassword(password);
//   if (!isPasswordCorrect) {
//     return res.status(StatusCodes.UNAUTHORIZED).json({
//       message: "Не корректные данные",
//     });
//   }

//   const token = provider.createJWT();

//   res.status(StatusCodes.OK).json({
//     provider: {
//       email: provider.email,
//       phone: provider.phone,
//       companyName: provider.companyName,
//       productCategory: provider.productCategory,
//       minOrder: provider.minOrder,
//       deliveryMethod: provider.deliveryMethod,
//       _id: provider._id,
//       inn: provider.inn,
//     },
//     token,
//   });
// };

const remindProvider = async (req, res) => {
  try {
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

    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(404).json({
        message: "Указанный Email не зарегистрирован",
      });
    }

    const { codeRecovery } = await sendRemindEmail(email);

    provider.codeRecovery = codeRecovery;

    await provider.save();
    return res.status(StatusCodes.CREATED).json({
      message: "Код для подтверждения отправлен на почту",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Не корректные данные",
    });
  }
};

const changePassword = async (req, res) => {
  const { email, newPassword, code } = req.body;
  if (!email || !newPassword || !code) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Укажите Email и пароль",
    });
  }

  const provider = await Provider.findOne({ email });
  if (!provider) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Не корректные данные",
    });
  }

  if (provider.codeRecovery !== code) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Не корректные данные",
    });
  }

  provider.password = newPassword;
  await provider.save();
  const token = provider.createJWT();

  res.status(StatusCodes.CREATED).json({
    provider: {
      email: provider.email,
      phone: provider.phone,
      companyName: provider.companyName,
      productCategory: provider.productCategory,
      minOrder: provider.minOrder,
      deliveryMethod: provider.deliveryMethod,
      isVerificated: provider.isVerificated,
      inn: provider.inn,
      _id: provider._id,
    },
    token,
  });
};

export { registerProvider, remindProvider, changePassword };
