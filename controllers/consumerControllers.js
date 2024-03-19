import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index-error.js";
import Consumer from "../models/Consumer.js";
import AWS from "aws-sdk";
import fs from "fs";
import Order from "../models/Order.js";

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
  console.log(req.body);
  // console.log(req.file);
  const { orderName, day, time, acceptTime, description, categories } =
    req.body;

  // if (
  //   !orderName ||
  //   !day ||
  //   !acceptTime ||
  //   !description ||
  //   !categories ||
  //   !time
  // ) {
  //   return res.status(400).json({ message: "Все поля должны быть заполнены." });
  // }

  let filePaths = [];
  if (req.files) {
    filePaths = req.files.map((file) => file.path);
    try {
      const order = await Order.create({
        orderName,
        day,
        time,
        acceptTime,
        description,
        categories,
        images: filePaths,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(500).send(error.message);
    }
    console.log(filePaths);
  } else {
    try {
      const order = await Order.create({
        orderName,
        day,
        time,
        acceptTime,
        description,
        categories,
      });
      res.status(StatusCodes.CREATED).json({ order });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
};
export { verificationConsumer, newOrder };
