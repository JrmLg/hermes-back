import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsFiles = fs
  .readdirSync(path.join(__dirname, 'handlers'))
  .filter((file) => file.endsWith('.js'));

const setupHandlers = [];

// eslint-disable-next-line no-restricted-syntax
for (const file of jsFiles) {
  // eslint-disable-next-line no-await-in-loop
  const module = await import(`./handlers/${file}`);
  setupHandlers.push(module.default);
}

export default function setupServer(io) {
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id, socket.username);
    socket.emit('connected', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id, socket.username);
    });

    setupHandlers.forEach((setupHandler) => setupHandler(io, socket));
  });
}
