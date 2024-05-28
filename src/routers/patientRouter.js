import express from 'express';
import patientController from '../controllers/patientController.js';

const router = express.Router();

/**
 * @swagger
 * /api/me/patients:
 *   get:
 *     summary: Get a patient with the last message
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patientsListWithLastMessage'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 *
 */
router.get('/', patientController.getPatients);

/**
 * @swagger
 * /api/me/patients:
 *   get:
 *     summary: Get a patient by his id
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       '401':
 *         description: Unauthorized access.
 *       '404':
 *         description: Patient not found.
 *       '500':
 *         description: Internal server error.
 *
 */
router.get('/:patientId', patientController.getPatientById);

/**
 * @swagger
 * /api/me/patients:
 *   post:
 *     summary: Create a new patient
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     responses:
 *       '201':
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', patientController.createPatient);

/**
 * @swagger
 * /api/me/patients/{patientId}:
 *   patch:
 *     summary: Update a patient by his id
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     responses:
 *       '200':
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patient'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/:patientId', patientController.updatePatient);

/**
 * @swagger
 * /api/me/patients/{patientId}/channels:
 *   get:
 *     summary: Get a patient with their associated channels
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/channelListWithLastMessage'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 *
 */
router.get('/:patientId/channels', patientController.getChannelsFromPatientId);

/**
 * @swagger
 * /api/me/patients/{patientId}/users:
 *   get:
 *     summary: Get a patient with their associated users
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userList'
 *       '401':
 *         description: Unauthorized access.
 *       '500':
 *         description: Internal server error.
 *
 */
router.get('/:patientId/users', patientController.getUsersFromPatientId);

/**
 * @swagger
 * /api/me/patients/{patientId}/users:
 *   post:
 *     summary: Add an user to a patient
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               rppsCode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patientWithUsers'
 *       '401':
 *         description: Unauthorized access.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *
 */
router.post('/:patientId/users', patientController.addUserToPatient);

/**
 * @swagger
 * /api/me/patients/{patientId}/users:
 *   delete:
 *     summary: Remove an user to a patient
 *     tags:
 *       - patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               rppsCode:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/patientWithUsers'
 *       '401':
 *         description: Unauthorized access.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *
 */
router.delete('/:patientId/users', patientController.removeUserFromPatient);

export default router;
