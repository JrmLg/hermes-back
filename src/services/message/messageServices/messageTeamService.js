import postgresClient from '../../../models/postgresClient.js';
import mongoClient from '../../../models/mongoClient.js';

export default {
  roomIdField: 'teamId',
  async canAccessRoom({ roomId, userId }) {
    const team = await postgresClient.team.findFirst({
      where: {
        AND: [{ id: roomId }, { users: { some: { id: userId } } }],
      },
    });
    return team !== null;
  },
};
