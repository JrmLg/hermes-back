import express from 'express';

import socketController from '../controllers/socketController.js';

const router = express.Router();

/**
 * @swagger
 * /api/me/socketIds:
 *   get:
 *     summary: Retrieve all socket ids for the user connected.
 *     tags:
 *       - socket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Socket ids retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/socket'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.get('/', socketController.getAllSocketIds);

/**
 * @swagger
 * /api/me/socketIds:
 *   post:
 *     summary: Add a socket id to the user connected.
 *     tags:
 *       - socket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/socket'
 *     responses:
 *       201:
 *         description: Socket id added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 socketId:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       400:
 *         description: Bad request, missing or invalid parameters.
 */
router.post('/', socketController.addSocketId);

export default router;
