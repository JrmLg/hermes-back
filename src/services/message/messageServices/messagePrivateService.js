import postgresClient from '../../../models/postgresClient.js';
import mongoClient from '../../../models/mongoClient.js';

export default {
  roomIdField: 'conversationId',
  async canAccessRoom({ roomId, userId }) {
    const privateConversation = await postgresClient.conversation.findFirst({
      where: {
        AND: [{ id: roomId }, { users: { some: { id: userId } } }],
      },
    });
    return privateConversation !== null;
  },
};
