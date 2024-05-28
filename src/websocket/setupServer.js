import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import mongoClient from '../models/mongoClient.js';
import postgresClient from '../models/postgresClient.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsFiles = fs.readdirSync(path.join(__dirname, 'listeners')).filter((file) => file.endsWith('.js'));

const setupHandlers = [];

// eslint-disable-next-line no-restricted-syntax
for (const file of jsFiles) {
  // eslint-disable-next-line no-await-in-loop
  const module = await import(`./listeners/${file}`);
  setupHandlers.push(module.default);
}

/**
 *
 * @param {import('socket.io').Server} io
 * */
export default function setupServer(io) {
  io.on('connection', async (socket) => {
    console.log('A user connected', socket.id);
    socket.on('authenticate', async () => {
      const socketUser = await mongoClient.socket.findFirst({ where: { socketId: socket.id } });

      if (socketUser) {
        const { socketId, userId } = socketUser;
        const user = await postgresClient.user.findUnique({
          where: { id: userId },
          include: {
            roles: true,
          },
        });

        if (!user) {
          console.log(`UserId ${userId} not found for socketId ${socketId}`);
          return;
        }

        console.log(`Websocket id ${socketId} is bind to the user : ${user.id}`);
        // eslint-disable-next-line no-param-reassign
        socket.locals = { user };
        setupHandlers.forEach((setupHandler) => setupHandler(io, socket));
        socket.emit('authenticated', { socketId, user });
      }
    });

    socket.on('disconnect', async () => {
      const userSocket = await mongoClient.socket.deleteMany({
        where: {
          socketId: socket.id,
        },
      });
      console.log(`The socketId ${socket.id} has been disconnected.`);
    });
  });
}
