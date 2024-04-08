// [ Package imports ]
import express from 'express';
import swaggerUi from 'swagger-ui-express';

// [ Local imports ]
import authRouter from './authRouter.js';
import meRouter from './meRouter.js';
import loginRequired from '../middlewares/loginRequired.js';
import swaggerSpec from '../api-docs/swagger.js';

const router = express.Router();

// Install middleware at apiRouter level
router.use(swaggerUi.serve); // serve swagger static files

router.get('/', swaggerUi.setup(swaggerSpec));

// Routes d'authentification
router.use('/auth', authRouter);

// Routes me
router.use('/me', loginRequired, meRouter);

export default router;
