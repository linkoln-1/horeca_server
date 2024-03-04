import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ProviderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Пожалуйста, укажите email"],
      trim: true,
      validate: [validator.isEmail, "Пожалуйста, укажите действительный email"],
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, "Пожалуйста, укажите название Вашей компании"],
    },
    inn: {
      type: Number,
      required: [true, "Пожалуйста, укажите ИНН Вашей компании"],
    },
    productCategory: {
      type: Array,
      required: [true, "Должна быть указана как минимум одна категория товара"],
    },
    minOrder: {
      type: Number,
      required: [true, "Вы не указали минимальную сумму заказа"],
    },
    deliveryMethod: {
      type: Array,
      required: [true, "Укажите способ доставки"],
    },
    password: {
      type: String,
      required: [true, "Пожалуйста, укажите пароль"],
      trim: true,
    },
    code: {
      type: Number,
    },
  },
  { timestamps: true }
);

ProviderSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ProviderSchema.methods.createJWT = function () {
  return jwt.sign({ providerId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

ProviderSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Provider", ProviderSchema);
