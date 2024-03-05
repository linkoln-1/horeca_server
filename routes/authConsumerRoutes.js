import express from "express";
const router = express.Router();
import {
  registerConsumer,
  loginConsumer,
} from "../controllers/authConsumerControllers.js";

/**
 * @swagger
 * /api/auth/consumer/register:
 *   post:
 *     summary: Регистрация общепита
 *     tags: [Регистрация/Верификация/Авторизация общепита]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - companyName
 *               - inn
 *               - productCategory
 *               - deliveryAddress
 *               - deliveryTime
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта общепита.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль для входа.
 *               companyName:
 *                 type: string
 *                 description: Название компании общепита.
 *               inn:
 *                 type: number
 *                 description: ИНН компании общепита.
 *               productCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Категории продуктов.
 *               deliveryAddress:
 *                 type: string
 *                 description: Адрес доставки.
 *               deliveryTime:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - day
 *                     - from
 *                     - to
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: День доставки.
 *                     from:
 *                       type: string
 *                       description: Время начала доставки.
 *                     to:
 *                       type: string
 *                       description: Время окончания доставки.
 *     responses:
 *       201:
 *         description: Потребитель успешно зарегистрирован.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 consumer:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     companyName:
 *                       type: string
 *                     productCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *                     deliveryAddress:
 *                       type: string
 *                     deliveryTime:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                           from:
 *                             type: string
 *                           to:
 *                             type: string
 *                     inn:
 *                       type: number
 *                     _id:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Ошибка запроса. Не все обязательные поля заполнены или электронная почта в некорректном формате.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/register").post(registerConsumer);

/**
 * @swagger
 * /api/auth/consumer/login:
 *   post:
 *     summary: Авторизация общепита
 *     tags: [Регистрация/Верификация/Авторизация общепита]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта общепита.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль для входа.
 *     responses:
 *       201:
 *         description: Потребитель успешно зарегистрирован.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 consumer:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     companyName:
 *                       type: string
 *                     productCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *                     deliveryAddress:
 *                       type: string
 *                     deliveryTime:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                           from:
 *                             type: string
 *                           to:
 *                             type: string
 *                     inn:
 *                       type: number
 *                     _id:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Ошибка запроса. Не указан Email или пароль.
 *       401:
 *         description: Неавторизованный доступ. Неверный Email или пароль.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/login").post(loginConsumer);

export default router;
