// [ Node imports ]
import { fileURLToPath } from 'url';
import path from 'path';

// [ Package imports ]
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// [ Local imports ]
import apiRouter from './routers/apiRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = path.join(__dirname, '../../projet-05-hermes-front/dist');

const app = express();

app.use(cookieParser()); // Parse cookies

app.use(express.urlencoded({ extended: true })); // Add a body parser before the router
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log HTTP requests

app.use(express.static(STATIC_DIR)); // Serve front-end files on url '/'
app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
