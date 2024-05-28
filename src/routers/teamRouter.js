import express from 'express';
import teamController from '../controllers/teamController.js';

const router = express.Router();

/**
 * @swagger
 * /api/me/teams:
 *   get:
 *     summary: List the team for a given user.
 *     tags:
 *       - team
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Information about the team requested
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the team
 *                   ownerId:
 *                     type: integer
 *                     description: The unique identifier of the owner of the team
 *                   name:
 *                     type: string
 *                     description: The name of the team
 *                   profilePictureUrl:
 *                     type: string
 *                     format: url
 *                     description: The URL to the user's profile picture
 *                   lastMessage:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique MongoDB identifier of the message
 *                       teamId:
 *                         type: integer
 *                         description: The unique identifier of the team
 *                       content:
 *                         type: string
 *                         description: content of the message
 *                       authorId:
 *                         type: integer
 *                         description: The unique identifier of the author
 *                     unreadMessagesCount:
 *                       type: integer
 *                       description: number of message unread by the connected user for this team conversation
 *                     totalMessages:
 *                       type: integer
 *                       description: total message in the team
 *       '400':
 *         description: Bad request (e.g., malformed request body)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not create the message due to server error)
 */
router.get('/', teamController.getTeams);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team.
 *     tags:
 *       - team
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team.
 *               profilePictureUrl:
 *                 type: string
 *                 description: The URL to the team's profile picture.
 *               color:
 *                 type: string
 *                 description: The color of the team.
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Successfully created team.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/team'
 *       '400':
 *         description: Bad request (e.g., malformed request body)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not create the team due to server error)
 */
router.post('/', teamController.newTeam);

/**
 * @swagger
 * /api/me/teams/{id}:
 *   get:
 *     summary: Get a team by ID.
 *     tags:
 *       - team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to get.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved team.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/team'
 *       '404':
 *         description: Team not found.
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not retrieve the team due to server error)
 */
router.get('/:id', teamController.getOneTeam);

/**
 * @swagger
 * /api/me/teams/{id}:
 *   patch:
 *     summary: Update a team by ID.
 *     tags:
 *       - team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/team'
 *     responses:
 *       '200':
 *         description: Successfully updated team.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/team'
 *       '404':
 *         description: Team not found.
 *       '400':
 *         description: Bad request (e.g., malformed request body)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not update the team due to server error)
 */
router.patch('/:id', teamController.updateTeam);

/**
 * @swagger
 * /api/me/teams/{id}:
 *   delete:
 *     summary: Delete a team by ID.
 *     tags:
 *       - team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Successfully deleted team.
 *       '404':
 *         description: Team not found.
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not delete the team due to server error)
 * */
router.delete('/:id', teamController.deleteTeam);

/**
 * @swagger
 * /api/me/teams/{id}/users:
 *   get:
 *     summary: Get teammates for the specified team.
 *     tags:
 *       - team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to retrieve teammates for.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of teammates for the specified team.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto-generated id for the user.
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                   firstname:
 *                     type: string
 *                     description: The first name of the user.
 *                   lastname:
 *                     type: string
 *                     description: The last name of the user.
 *                   rppsCode:
 *                     type: string
 *                     description: Identificator in the french shared directory of health professionals.
 *                   profilePictureUrl:
 *                     type: string
 *                     description: The URL to the user's profile picture.
 *       '400':
 *         description: Bad request (e.g., malformed request body).
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token).
 *       '500':
 *         description: Internal server error (e.g., could not create the message due to server error).
 */
router.get('/:id/users', teamController.getTeammates);

/**
 * @swagger
 * /api/me/teams/{teamId}/users/{userId}:
 *   post:
 *     summary: Add a teammate to a team.
 *     tags:
 *       - team
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the team to which the teammate will be added.
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to be added as a teammate.
 *     responses:
 *       '200':
 *         description: Successfully added the teammate to the team.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 added:
 *                   type: boolean
 *                   description: Indicates if the user was successfully added to the team.
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user.
 *                 updatedTeam:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the team.
 *                     ownerId:
 *                       type: integer
 *                       description: The ID of the owner of the team.
 *                     name:
 *                       type: string
 *                       description: The name of the team.
 *                     color:
 *                       type: string
 *                       description: The color of the team.
 *                     profilePictureUrl:
 *                       type: string
 *                       description: The URL of the team's profile picture.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the team was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the team was last updated.
 *       '400':
 *         description: Bad request (e.g., invalid parameters).
 *       '401':
 *         description: Unauthorized (e.g., missing authentication token).
 *       '404':
 *         description: Not found (e.g., team or user not found).
 *       '500':
 *         description: Internal server error (e.g., database error).
 */
router.post('/:teamId/users/:userId', teamController.addTeammate);

/**
 * @swagger
 * /api/me/teams/{teamId}/users/{userId}:
 *   delete:
 *     summary: Remove a teammate from a team.
 *     tags:
 *       - team
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the team from which the teammate will be removed.
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user that will be removed from the team.
 *     responses:
 *       '200':
 *         description: Successfully removed the teammate from the team.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                   description: Indicates if the user was successfully removed from the team.
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user.
 *                 updatedTeam:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the team.
 *                     ownerId:
 *                       type: integer
 *                       description: The ID of the owner of the team.
 *                     name:
 *                       type: string
 *                       description: The name of the team.
 *                     color:
 *                       type: string
 *                       description: The color of the team.
 *                     profilePictureUrl:
 *                       type: string
 *                       description: The URL of the team's profile picture.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the team was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the team was last updated.
 *       '400':
 *         description: Bad request (e.g., invalid parameters).
 *       '401':
 *         description: Unauthorized (e.g., missing authentication token).
 *       '404':
 *         description: Not found (e.g., team or user not found).
 *       '500':
 *         description: Internal server error (e.g., database error).
 */
router.delete('/:teamId/users/:userId', teamController.removeTeammate);

export default router;
