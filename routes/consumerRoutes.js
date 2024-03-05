import express from "express";
const router = express.Router();
import { verificationConsumer } from "../controllers/consumerControllers.js";

/**
 * @swagger
 * /api/consumer/verification:
 *   post:
 *     summary: Верификация общепита
 *     tags: [Регистрация/Верификация/Авторизация общепита]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - consumerId
 *             properties:
 *               code:
 *                 type: string
 *                 description: Код верификации, отправленный на электронную почту общепита.
 *               consumerId:
 *                 type: string
 *                 description: Идентификатор общепита, полученный при регистрации.
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
 *       401:
 *         description: Ошибка верификации. Код не совпадает или пользователь не найден.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

router.route("/verification").post(verificationConsumer);

export default router;
