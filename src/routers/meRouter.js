import express from 'express';
import meController from '../controllers/meController.js';

import messageRouter from './messageRouter.js';
import patientRouter from './patientRouter.js';
import teamRouter from './teamRouter.js';
import socketRouter from './socketRouter.js';
import privateRouter from './privateRouter.js';

const router = express.Router();

// Routes
router.use('/privates', privateRouter);
router.use('/messages', messageRouter);
router.use('/patients', patientRouter);
router.use('/socketIds', socketRouter);
router.use('/teams', teamRouter);

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Retrieve user information
 *     tags:
 *       - me
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */
router.get('/', meController.getMe);

/**
 * @swagger
 * /api/me:
 *   patch:
 *     summary: Update user informations
 *     tags:
 *       - me
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: Updated user informations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *        description: Internal server error.
 */
router.patch('/', meController.updateMe);

/**
 * @swagger
 * /api/me/last-message-read:
 *   patch:
 *     summary: Update the last message read for a user in a private, channel, or team
 *     description: |
 *       Updates the last read message for a user, specifying only one of privateId, channelId, or teamId.
 *       These three parameters are mutually exclusive – only one of them should be provided.
 *     tags:
 *       - me
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messageId
 *             properties:
 *               messageId:
 *                 type: string
 *                 description: The ID of the last message that has been read.
 *               privateId:
 *                 type: integer
 *                 description: The ID of the private to update the last message read, mutually exclusive with channelId and teamId.
 *               channelId:
 *                 type: integer
 *                 description: The ID of the channel to update the last message read, mutually exclusive with privateId and teamId.
 *               teamId:
 *                 type: integer
 *                 description: The ID of the team to update the last message read, mutually exclusive with privateId and channelId.
 *     responses:
 *       '200':
 *         description: Last message read updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Last message read updated'
 *       '400':
 *         description: Bad request - missing or incorrect parameters.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *        description: Internal server error.
 */
router.patch('/last-message-read', meController.updateLastMessageRead);

export default router;
