import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Provider from "../models/Provider.js";
import { sendVerificationEmail } from "../utils/emailVerification.js";
import cryptoRandomString from "crypto-random-string";

const registerProvider = async (req, res) => {
  try {
    const {
      email,
      password,
      companyName,
      productCategory,
      minOrder,
      deliveryMethod,
      inn,
    } = req.body;
    console.log(req.body);
    if (!email || !password) {
      throw new BadRequestError("Введите все значения");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Некорректный формат электронной почты");
    }

    const providerAlreadyExist = await Provider.findOne({ email });
    if (providerAlreadyExist) {
      throw new BadRequestError("Email уже используется");
    }

    const code = cryptoRandomString({ length: 6, type: "numeric" });
    console.log(code);

    const provider = await Provider.create({
      email,
      password,
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
        companyName: provider.companyName,
        productCategory: provider.productCategory,
        minOrder: provider.minOrder,
        deliveryMethod: provider.deliveryMethod,
        _id: provider._id,
        inn: provider.inn,
      },
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export { registerProvider };
