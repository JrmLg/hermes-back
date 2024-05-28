import express from 'express';
import searchController from '../controllers/searchController.js';

const router = express.Router();

/**
 * @swagger
 * /api/search-user:
 *   get:
 *     summary: Rechercher un utilisateur
 *     tags:
 *       - search
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Information about the user requested.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the user
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *                 firstname:
 *                   type: string
 *                   description: The first name of the user
 *                 lastname:
 *                   type: string
 *                   description: The last name of the user
 *                 rppsCode:
 *                   type: string
 *                   description: Identificator in the french shared directory of health professionals
 *                 profilePictureUrl:
 *                   type: string
 *                   format: uri
 *                   description: The URL to the user's profile picture
 *       '400':
 *         description: Bad request (e.g., malformed request body)
 *       '401':
 *         description: Unauthorized (e.g., invalid or missing authentication token)
 *       '500':
 *         description: Internal server error (e.g., could not create the message due to server error)
 */
router.get('/', searchController.getUser);

export default router;
