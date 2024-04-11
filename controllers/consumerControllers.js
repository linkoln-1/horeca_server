import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Consumer from "../models/Consumer.js";
import AWS from "aws-sdk";
import fs from "fs";
import Order from "../models/Order.js";
import Template from "../models/Template.js";

const spacesEndpoint = new AWS.Endpoint("fra1.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACE_ACCESS_KEY,
  secretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY,
});
const bucketName = process.env.SPACE_BUCKET_NAME;
console.log("bucketName", bucketName);

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
        phone: consumer.phone,
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

const newOrder = async (req, res) => {
  const {
    orderName,
    day,
    time,
    acceptTime,
    description,
    categories,
    consumerId,
  } = req.body;

  if (
    !orderName ||
    !day ||
    !acceptTime ||
    !description ||
    !categories ||
    !time
  ) {
    return res.status(400).json({ message: "Все поля должны быть заполнены." });
  }

  let filePaths = [];
  if (req.files) {
    const uploadPromises = req.files.map((file) => {
      const fileContent = fs.readFileSync(file.path);
      // const uploadPromises = req.files.map(async (file) => {
      //   const fileContent = await fs.readFile(file.path);

      const params = {
        Bucket: bucketName,
        Key: `${file.path}`,
        Body: fileContent,
        ACL: "public-read",
      };
      return s3
        .upload(params)
        .promise()
        .then((data) => {
          return data.Location;
        });
    });

    try {
      filePaths = await Promise.all(uploadPromises);
    } catch (error) {
      return res
        .status(500)
        .send("Ошибка при загрузке файлов: " + error.message);
    }

    try {
      const order = await Order.create({
        orderName,
        day,
        time,
        acceptTime,
        description,
        categories,
        consumerId,
        images: filePaths,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    try {
      const order = await Order.create({
        orderName,
        day,
        time,
        acceptTime,
        description,
        consumerId,
        categories,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
};

const getAllOrdersByConsumerId = async (req, res) => {
  const orders = await Order.find({ consumerId: req.params.consumerId });
  console.log(orders);
  res.status(StatusCodes.OK).json({ orders });
};

const editMainInfo = async (req, res) => {
  const { phone, companyName, email, password, consumerId } = req.body;
  if (!consumerId) {
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
    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Повторите позже",
      });
    }

    consumer.phone = phone;
    consumer.companyName = companyName;
    consumer.email = email;
    consumer.password = password;

    await consumer.save();
    const token = consumer.createJWT();

    res.status(StatusCodes.CREATED).json({
      consumer: {
        email: consumer.email,
        phone: consumer.phone,
        companyName: consumer.companyName,
        deliveryAddress: consumer.deliveryAddress,
        deliveryTime: consumer.deliveryTime,
        inn: consumer.inn,
        _id: consumer._id,
      },
      token,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка сервера" });
  }
};

const editExtraInfo = async (req, res) => {
  try {
    const { consumerId, deliveryAddress, deliveryTime } = req.body;
    if (!consumerId) {
      throw new BadRequestError("Попробуйте позднее");
    }
    const consumer = await Consumer.findByIdAndUpdate(consumerId, {
      deliveryAddress,
      deliveryTime,
    });

    if (!consumerId) {
      throw new BadRequestError("Попробуйте позднее");
    }

    const token = consumer.createJWT();

    res.status(StatusCodes.CREATED).json({
      consumer: {
        email: consumer.email,
        phone: consumer.phone,
        companyName: consumer.companyName,
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

const newTemplate = async (req, res) => {
  const {
    templateName,
    // orderName,
    day,
    time,
    acceptTime,
    description,
    categories,
    consumerId,
  } = req.body;

  if (
    !templateName ||
    // !orderName ||
    !day ||
    !acceptTime ||
    !description ||
    !categories ||
    !time
  ) {
    return res.status(400).json({ message: "Все поля должны быть заполнены." });
  }

  let filePaths = [];
  if (req.files) {
    const uploadPromises = req.files.map((file) => {
      const fileContent = fs.readFileSync(file.path);
      // const uploadPromises = req.files.map(async (file) => {
      //   const fileContent = await fs.readFile(file.path);

      const params = {
        Bucket: bucketName,
        Key: `${file.path}`,
        Body: fileContent,
        ACL: "public-read",
      };
      return s3
        .upload(params)
        .promise()
        .then((data) => {
          return data.Location;
        });
    });

    try {
      filePaths = await Promise.all(uploadPromises);
    } catch (error) {
      return res
        .status(500)
        .send("Ошибка при загрузке файлов: " + error.message);
    }

    try {
      const order = await Template.create({
        templateName,
        // orderName,
        day,
        time,
        acceptTime,
        description,
        categories,
        consumerId,
        images: filePaths,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    try {
      const order = await Template.create({
        templateName,
        // orderName,
        day,
        time,
        acceptTime,
        description,
        consumerId,
        categories,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
};

const getAllTemplatesByConsumerId = async (req, res) => {
  const templates = await Template.find({ consumerId: req.params.consumerId });
  res.status(StatusCodes.OK).json({ templates });
};

const deleteTemplateById = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(
      req.params.templateId
    );
    if (!deletedTemplate) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Шаблон не найден" });
    }
    res.status(StatusCodes.OK).json({ message: "Шаблон успешно удален" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Произошла ошибка при удалении шаблона",
      error: error.message,
    });
  }
};

export {
  verificationConsumer,
  newOrder,
  getAllOrdersByConsumerId,
  editMainInfo,
  newTemplate,
  getAllTemplatesByConsumerId,
  deleteTemplateById,
  editExtraInfo,
};
