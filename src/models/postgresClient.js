import '../helpers/envLoader.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/postgres/client/index.js';

const postgresClient = new PrismaClient();

process.on('exit', async () => {
  console.log('Disconnecting from postgres database...');
  await postgresClient.$disconnect();
});

export default postgresClient;
