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
 *                 type: string
 *                 description: ИНН компании общепита.
 *               productCategory:
 *                 type: string
 *                 description: Категория продуктов.
 *               deliveryAddress:
 *                 type: string
 *                 description: Адрес доставки.
 *               deliveryTime:
 *                 type: string
 *                 description: Предпочтительное время доставки.
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
 *                       type: string
 *                     deliveryAddress:
 *                       type: string
 *                     deliveryTime:
 *                       type: string
 *                     inn:
 *                       type: string
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
 *       200:
 *         description: Успешный вход. Возвращает информацию об общепите и токен доступа.
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
 *                       type: string
 *                     deliveryAddress:
 *                       type: string
 *                     deliveryTime:
 *                       type: string
 *                     isVerificated:
 *                       type: boolean
 *                     inn:
 *                       type: string
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
