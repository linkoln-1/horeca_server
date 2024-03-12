import express from "express";
const router = express.Router();
import { verificationProvider } from "../controllers/providerControllers.js";

/**
 * @swagger
 * /api/provider/verification:
 *   post:
 *     summary: Верификация поставщика
 *     tags: [Регистрация/Верификация/Авторизация поставщика]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - providerId
 *             properties:
 *               code:
 *                 type: string
 *                 description: Верификационный код, отправленный на электронную почту поставщика.
 *               providerId:
 *                 type: string
 *                 description: Уникальный идентификатор поставщика.
 *     responses:
 *       201:
 *         description: Поставщик успешно верифицирован. Возвращает информацию о верифицированном поставщике.
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
 *       401:
 *         description: Неавторизованный доступ. Неверный код верификации или поставщик не найден.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */
router.route("/verification").post(verificationProvider);

export default router;


