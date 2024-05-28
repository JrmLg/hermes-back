import postgresClient from '../../../models/postgresClient.js';
import mongoClient from '../../../models/mongoClient.js';

export default {
  roomIdField: 'channelId',
  async canAccessRoom({ roomId, userId }) {
    const channel = await postgresClient.channel.findFirst({
      where: {
        AND: [{ id: roomId }, { patient: { users: { some: { id: userId } } } }],
      },
    });
    return channel !== null;
  },
};
