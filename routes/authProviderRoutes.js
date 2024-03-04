import express from "express";
const router = express.Router();
import { registerProvider } from "../controllers/authProviderControllers.js";

/**
 * @swagger
 * /api/auth/provider/register:
 *   post:
 *     summary: Регистрация нового поставщика
 *     tags: [Регистрация поставщика]
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
 *               companyName:
 *                 type: string
 *                 description: Название компании провайдера.
 *               productCategory:
 *                 type: string
 *                 description: Категория продуктов, которые предлагает компания.
 *               minOrder:
 *                 type: number
 *                 description: Минимальный размер заказа.
 *               deliveryMethod:
 *                 type: string
 *                 description: Способ доставки.
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
 *                       type: string
 *                     minOrder:
 *                       type: number
 *                     deliveryMethod:
 *                       type: string
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

export default router;
