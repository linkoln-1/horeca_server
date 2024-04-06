import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: [true, "Пожалуйста, укажите название шаблона"],
      trim: true,
    },
    orderName: {
      type: String,
      required: [true, "Пожалуйста, укажите название заявки"],
      trim: true,
    },
    consumerId: {
      type: String,
      required: [true, "Что то пошло не так, попробуйте позже"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    day: {
      type: String,
      required: [true, "Пожалуйста, укажите крайний день доставки"],
    },
    time: {
      type: String,
      required: [true, "Пожалуйста, укажите крайнее время доставки"],
    },
    acceptTime: {
      type: String,
      required: [
        true,
        "Пожалуйста, укажите время до которого принимается доставка",
      ],
    },
    description: {
      type: String,
      required: [true, "Пожалуйста, добавьте описание заявки"],
    },
    images: [String],
    categories: [
      {
        categoryName: {
          type: String,
          required: true,
          required: [true, "Пожалуйста, укажите название категории"],
        },
        products: [
          {
            productName: {
              type: String,
              required: [true, "Пожалуйста, укажите название"],
            },
            amount: {
              type: Number,
              required: [true, "Пожалуйста, укажите количество"],
            },
            measure: {
              type: String,
              required: true,
              required: [true, "Пожалуйста, укажите единицу измерения"],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Template", TemplateSchema);
