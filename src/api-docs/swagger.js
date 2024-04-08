import swaggerJsdoc from 'swagger-jsdoc';

import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import '../helpers/envLoader.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let schemas = {};

// Boucle 'for of' couplé à fs pour ajouter tout les schemas dans le fichier swagger

const files = fs.readdirSync(path.join(__dirname, 'schema'));

// eslint-disable-next-line no-restricted-syntax
for (const file of files) {
  // eslint-disable-next-line no-await-in-loop
  const model = await import(`./schema/${file}`);

  schemas = { ...schemas, ...model.default };
}

const options = {

  definition: {

    openapi: '3.0.0',

    info: {

      title: 'Hermès API Documentation',

      version: '1.0.0',

      description: 'Hermès messagerie API documentation',

    },

    servers: [{ url: process.env.URL_API }],

    tags: [

      { name: 'auth', description: 'Authentication management' },

      { name: 'search', description: 'Routes about search' },

      { name: 'team', description: 'Team management' },

      { name: 'conversation', description: 'Conversation management' },

      { name: 'setting', description: 'Settings management' },

      { name: 'patient', description: 'Patient management' },

      { name: 'channel', description: 'Channel management' },

      { name: 'message', description: 'Message management' },

      { name: 'me', description: 'Routes about currently logged user' },

      { name: 'location', description: 'Routes about cities and zip codes' },

    ],

    components: {

      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

  },

  apis: ['./src/routers/*.js'],

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
