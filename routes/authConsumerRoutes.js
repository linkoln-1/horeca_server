import express from "express";
const router = express.Router();
import { registerConsumer } from "../controllers/authConsumerControllers.js";

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

export default router;
