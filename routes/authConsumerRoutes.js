import express from "express";
const router = express.Router();
import {
  registerConsumer,
  loginConsumer,
  remindConsumer,
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
 *               - phone
 *               - companyName
 *               - inn
 *               - productCategory
 *               - deliveryAddress
 *               - deliveryMethod
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта общепита.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль для входа.
 *               phone:
 *                 type: string
 *                 format: phone
 *                 description: Контактный телефон.
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
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     description: Адрес доставки.
 *                   deliveryTime:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         day:
 *                           type: string
 *                           description: День доставки.
 *                         from:
 *                           type: string
 *                           description: Время начала доставки.
 *                         to:
 *                           type: string
 *                           description: Время окончания доставки.
 *                 required:
 *                   - address
 *                   - deliveryTime
 *                 description: Адрес и временные рамки доставки.
 *               deliveryMethod:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Метод доставки.
 *               code:
 *                 type: number
 *                 description: Код для верификации (необязательный).
 *               isVerificated:
 *                 type: boolean
 *                 description: Статус верификации (по умолчанию false).
 *     responses:
 *       201:
 *         description: Потребитель успешно зарегистрирован.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consumer'
 *       400:
 *         description: Ошибка запроса. Не все обязательные поля заполнены или электронная почта в некорректном формате.
 *       500:
 *         description: Внутренняя ошибка сервера.
 *
 * components:
 *   schemas:
 *     Consumer:
 *       type: object
 *       required:
 *         - email
 *         - phone
 *         - companyName
 *         - inn
 *         - productCategory
 *         - deliveryAddress
 *         - deliveryMethod
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         companyName:
 *           type: string
 *         inn:
 *           type: number
 *         productCategory:
 *           type: array
 *           items:
 *             type: string
 *         deliveryAddress:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             deliveryTime:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: string
 *                   from:
 *                     type: string
 *                   to:
 *                     type: string
 *         deliveryMethod:
 *           type: array
 *           items:
 *             type: string
 *         code:
 *           type: number
 *         isVerificated:
 *           type: boolean
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

/**
 * @swagger
 * /api/auth/consumer/remind:
 *   post:
 *     summary: Генерация и отправка нового пароля общепиту.
 *     tags: [Регистрация/Верификация/Авторизация общепита]
 *     description: Отправляет на электронную почту общепита новый пароль, если указанный email зарегистрирован.
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
 *                 description: Электронная почта общепита для восстановления пароля.
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

router.route("/remind").post(remindConsumer);

export default router;
