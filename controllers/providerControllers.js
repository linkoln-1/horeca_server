import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Provider from "../models/Provider.js";

const verificationProvider = async (req, res) => {
  // console.log(req.body);

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

export { verificationProvider };


