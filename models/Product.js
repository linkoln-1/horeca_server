import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// // Middleware для генерации уникального _id перед сохранением продукта
// ProductSchema.pre('save', function(next) {
//     if (!this.isNew) {
//       return next(); // Если документ не новый, то пропускаем генерацию _id
//     }

//     this._id = uuidv4(); // Генерируем новый уникальный _id для нового продукта
//     next();
//   });

export default mongoose.model("Product", ProductSchema);
