import express from 'express';
import privateController from '../controllers/privateController.js';

// import permissionRequired from '../middlewares/permissionRequired.js';
// import permissions from '../utils/permissions/permissions.js';

const router = express.Router();

/* router.use(
  permissionRequired(permissions.private.all.canReadPrivate),
); */

/**
 * @swagger
 * /api/me/privates:
 *   get:
 *     summary: List of user privates
 *     tags:
 *       - private
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User privates with the last message, unread message count, and total message count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   privateid:
 *                     type: integer
 *                     description: The unique identifier of the private
 *                   receiver:
 *                     type: object
 *                     description: Information about the other user in the private
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique identifier of the user
 *                       email:
 *                         type: string
 *                         description: The email address of the user
 *                       firstname:
 *                         type: string
 *                         description: The first name of the user
 *                       lastname:
 *                         type: string
 *                         description: The last name of the user
 *                       profilePictureUrl:
 *                         type: string
 *                         format: uri
 *                         description: The URL to the user's profile picture
 *                   lastMessage:
 *                     $ref: '#/components/schemas/message'
 *                     description: The last message in the private
 *                   unreadMessagesCount:
 *                     type: integer
 *                     description: The count of unread messages in the private
 *                   totalMessages:
 *                     type: integer
 *                     description: The total number of messages in the private
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get('/', privateController.getPrivates);

/**
 * @swagger
 * /api/me/privates/{privateId}:
 *   get:
 *     summary: Get private
 *     tags:
 *       - private
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: privateId
 *         required: true
 *         description: The private identifier
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Private found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversationId:
 *                   type: integer
 *                   description: The unique identifier of the private
 *                 receiver:
 *                   type: object
 *                   description: Information about the other user in the private
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier of the user
 *                     email:
 *                       type: string
 *                       description: The email address of the user
 *                     firstname:
 *                       type: string
 *                       description: The first name of the user
 *                     lastname:
 *                       type: string
 *                       description: The last name of the user
 *                     profilePictureUrl:
 *                       type: string
 *                       format: uri
 *                       description: The URL to the user's profile picture
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/message'
 *                   description: The messages in the private
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Private not found
 *       500:
 *         description: Internal server error
 * */
router.get('/:privateId', privateController.getOnePrivate);

/**
 * @swagger
 * /api/me/privates:
 *   post:
 *     summary: New private
 *     tags:
 *       - private
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Private already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 created:
 *                   type: boolean
 *               example:
 *                 id: 1
 *                 created: false
 *       201:
 *         description: New private created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 created:
 *                   type: boolean
 *               example:
 *                 id: 1
 *                 created: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receiver not found
 *       500:
 *        description: Internal server error
 */
router.post('/', privateController.newPrivate);

export default router;
