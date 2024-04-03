import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Provider from "../models/Provider.js";

const verificationProvider = async (req, res) => {
  try {
    const { code, providerId } = req.body;
    if (!code || !providerId) {
      throw new UnAuthenticatedError(
        "Укажите код, уоторый был Вам отправлен на Email"
      );
    }

    const provider = await Provider.findById(providerId);
    if (!provider) {
      throw new UnAuthenticatedError("Ошибка, попробуйте позднее");
    }

    if (provider.code !== code) {
      throw new UnAuthenticatedError("Код указан не верно!");
    }

    provider.isVerificated = true;
    await provider.save();

    res.status(StatusCodes.CREATED).json({
      provider: {
        email: provider.email,
        phone: provider.phone,
        companyName: provider.companyName,
        productCategory: provider.productCategory,
        minOrder: provider.minOrder,
        deliveryMethod: provider.deliveryMethod,
        _id: provider._id,
        inn: provider.inn,
        isVerificated: provider.isVerificated,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getAllOrdersByConsumerId = async (req, res) => {
  const orders = await Order.find({ consumerId: req.params.consumerId });
  console.log(orders);
  res.status(StatusCodes.OK).json({ orders });
};

const editMainInfo = async (req, res) => {
  const { phone, companyName, email, password, providerId } = req.body;
  if (!providerId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Повторите позже",
    });
  }

  const emailProviderExist = await Provider.find({ email: email });
  const emailConsumerExist = await Provider.find({ email: email });

  if (emailProviderExist || emailConsumerExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email уже используется",
    });
  }

  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Повторите позже",
      });
    }

    provider.phone = phone;
    provider.companyName = companyName;
    provider.email = email;
    provider.password = password;

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
        _id: provider._id,
        inn: provider.inn,
      },
      token,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка сервера" });
  }
};

export { verificationProvider, editMainInfo };
