import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *       409:
 *         description: Conflict, user already exists.
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user to log in.
 *               password:
 *                 type: string
 *                 description: The password of the user to log in.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       401:
 *         description: Unauthorized, wrong credentials.
 *       404:
 *         description: Not found, user not found.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out current user
 *     tags:
 *       - auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: Unauthorized, wrong credentials.
 */
router.post('/logout', authController.logout);

export default router;
