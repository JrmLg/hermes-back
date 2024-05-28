import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

/**
 * @swagger
 * /api/me/messages:
 *   post:
 *     summary: Create a new message
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the message.
 *               roomType:
 *                 type: string
 *                 enum: [team, private, channel]
 *                 description: The type of room to send the message
 *               roomId:
 *                 required: true
 *                 schema:
 *                   type: integer
 *                 description: The ID of room to send the message
 *     responses:
 *       '201':
 *         description: New message created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/message'
 *       '400':
 *         description: Bad request (e.g., malformed request body)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not create the message due to server error)
 */
router.post('/', messageController.createMessage);

/**
 * @swagger
 * /api/me/messages/{messageId}:
 *   patch:
 *     summary: Update an existing message
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content of the message
 *     responses:
 *       '200':
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/message'
 *       '400':
 *         description: Bad request (e.g., malformed request body or invalid messageId)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error (e.g., could not update the message due to server error)
 */
router.patch('/:messageId', messageController.updateMessage);

/**
 * @swagger
 * /api/me/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the message to delete
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error (e.g., could not delete the message due to server error)
 */
router.delete('/:messageId', messageController.deleteMessage);

/**
 * @swagger
 * /api/me/messages/{roomType(team|private|channel)}/{roomId}:
 *   get:
 *     summary: Retrieve messages from a specific room based on room type and room ID, with pagination
 *     tags:
 *       - message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [team, private, channel]
 *         description: The type of the room to retrieve messages from
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the room to retrieve messages from
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the message list
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of messages per page
 *       - in: query
 *         name: originTimestamp
 *         schema:
 *           type: integer
 *           default: Date.now()
 *         description: The timestamp to set the origin (UNIX milliseconds)
 *       - in: query
 *         name: timelineDirection
 *         schema:
 *           type: string
 *           default: older
 *         description: The direction of the timeline to retrieve messages from (older or newer)
 *     responses:
 *       '200':
 *         description: Room messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roomType:
 *                   type: string
 *                   description: The type of the room
 *                 roomId:
 *                   type: integer
 *                   description: The ID of the room
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       authorId:
 *                         type: integer
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalMessages:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     originTimestamp:
 *                       type: string
 *                       format: date-time
 *                       description: The original timestamp when the query was made
 *       '400':
 *         description: Invalid request parameters
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:roomType(team|private|channel)/:roomId', messageController.getOneRoomWithMessages);

export default router;
