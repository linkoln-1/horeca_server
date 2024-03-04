import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ConsumerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Пожалуйста, укажите название"],
      trim: true,
    },
    inn: {
      type: String,
      required: [true, "Пожалуйста, укажите ИНН Вашей компании"],
    },
    email: {
      type: String,
      required: [true, "Пожалуйста, укажите email"],
      trim: true,
      validate: [validator.isEmail, "Пожалуйста, укажите действительный email"],
    },
    productCategory: {
      type: Array,
    },
    deliveryAddress: {
      type: String,
    },
    deliveryTime: [
      {
        day: { type: String },
        from: { type: String },
        to: { type: String },
      },
    ],

    password: {
      type: String,
      required: [true, "Пожалуйста, укажите пароль"],
      trim: true,
    },
  },
  { timestamps: true }
);

ConsumerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ConsumerSchema.methods.createJWT = function () {
  return jwt.sign({ consumerId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

ConsumerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Consumer", ConsumerSchema);
