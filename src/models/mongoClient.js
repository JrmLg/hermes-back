import '../helpers/envLoader.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/mongodb/client/index.js';

const mongoClient = new PrismaClient();

process.on('exit', async () => {
  console.log('Disconnecting from mongo database...');
  await mongoClient.$disconnect();
});

export default mongoClient;
