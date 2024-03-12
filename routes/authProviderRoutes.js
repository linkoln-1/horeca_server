import express from "express";
const router = express.Router();
import {
  registerProvider,
  loginProvider,
  remindProvider,
} from "../controllers/authProviderControllers.js";

/**
 * @swagger
 * /api/auth/provider/register:
 *   post:
 *     summary: Регистрация поставщика
 *     tags: [Регистрация/Верификация/Авторизация поставщика]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - phone
 *               - companyName
 *               - productCategory
 *               - minOrder
 *               - deliveryMethod
 *               - inn
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта провайдера.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль для входа в систему.
 *               phone:
 *                 type: string
 *                 format: phone
 *                 description: Контактный телефон
 *               companyName:
 *                 type: string
 *                 description: Название компании провайдера.
 *               productCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Категории продуктов, которые предлагает компания.
 *               minOrder:
 *                 type: number
 *                 description: Минимальный размер заказа.
 *               deliveryMethod:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Способы доставки.
 *               inn:
 *                 type: number
 *                 description: ИНН компании.
 *     responses:
 *       201:
 *         description: Провайдер успешно зарегистрирован. Возвращает информацию о провайдере и токен доступа. Шестизначный код генерируется и отправляется на почту.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provider:
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
 *                     minOrder:
 *                       type: number
 *                     deliveryMethod:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isVerificated:
 *                       type: boolean
 *                       description: Статус верификации провайдера.
 *                     _id:
 *                       type: string
 *                     inn:
 *                       type: number
 *                 token:
 *                   type: string
 *       400:
 *         description: Неверный запрос. Введены не все значения или некорректный формат электронной почты.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/register").post(registerProvider);

/**
 * @swagger
 * /api/auth/provider/login:
 *   post:
 *     summary: Авторизация поставщика
 *     tags: [Регистрация/Верификация/Авторизация поставщика]
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
 *                 description: Электронная почта поставщика.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль поставщика.
 *     responses:
 *       201:
 *         description: Провайдер успешно зарегистрирован. Возвращает информацию о провайдере и токен доступа. Шестизначный код генерируется и отправляется на почту.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 provider:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     companyName:
 *                       type: string
 *                     productCategory:
 *                       type: string
 *                     minOrder:
 *                       type: string
 *                     deliveryMethod:
 *                       type: string
 *                     _id:
 *                       type: string
 *                     inn:
 *                       type: string
 *                     isVerificated:
 *                       type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Неверный запрос. Email или пароль не указаны.
 *       401:
 *         description: Неавторизован. Некорректные учетные данные.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/login").post(loginProvider);

/**
 * @swagger
 * /api/auth/provider/remind:
 *   post:
 *     summary: Генерация и отправка нового пароля поставщику.
 *     tags: [Регистрация/Верификация/Авторизация поставщика]
 *     description: Отправляет на электронную почту поставщика новый пароль, если указанный email зарегистрирован.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта поставщика для восстановления пароля.
 *     responses:
 *       201:
 *         description: Новый пароль успешно сгенерирован и отправлен на электронную почту.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Новый пароль сгенерирован и отправлен Вам на почту.
 *       400:
 *         description: Некорректный запрос, возможно, неверный формат электронной почты или отсутствие обязательных данных.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Не корректные данные.
 *       404:
 *         description: Указанный email не зарегистрирован в системе.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Указанный Email не зарегистрирован.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/remind").post(remindProvider);

export default router;


