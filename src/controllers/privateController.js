import postgresClient from '../models/postgresClient.js';

import messageService from '../services/message/messageService.js';
import receiverIdSchema from '../utils/validation/receiverIdSchema.js';

export default {
  async getPrivates(req, res, next) {
    const { user } = res.locals;

    try {
      const privateConversations = await postgresClient.conversation.findMany({
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
        include: {
          users: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              profilePictureUrl: true,
              rppsCode: true,
            },
            where: {
              id: {
                not: user.id,
              },
            },
          },
        },
      });

      const roomsInfoById = {};
      await Promise.all(
        privateConversations.map(async (privateConversation) => {
          const roomInfo = await messageService.getRoomInfo({
            roomType: 'private',
            roomId: privateConversation.id,
            userId: user.id,
          });
          roomsInfoById[privateConversation.id] = roomInfo;
        }),
      );

      return res.json(
        privateConversations.map((privateConversation) => {
          const roomInfo = roomsInfoById[privateConversation.id];

          return {
            privateId: privateConversation.id,
            receiver: privateConversation.users[0],
            ...roomInfo,
          };
        }),
      );
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },

  async getOnePrivate(req, res, next) {
    const { user } = res.locals;

    const privateId = parseInt(req.params.privateId, 10);

    try {
      const privateConversation = await postgresClient.conversation.findFirst({
        where: {
          id: privateId,
          users: {
            some: {
              id: user.id,
            },
          },
        },
        include: {
          users: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              profilePictureUrl: true,
              rppsCode: true,
            },
            where: {
              id: {
                not: user.id,
              },
            },
          },
        },
      });

      if (!privateConversation) {
        return next({
          status: 404,
          message: 'Private not found',
        });
      }

      const roomInfo = await messageService.getRoomInfo({
        roomType: 'private',
        roomId: privateId,
        userId: user.id,
      });

      return res.json({
        privateId,
        receiver: privateConversation.users[0],
        ...roomInfo,
      });
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },

  async newPrivate(req, res, next) {
    const { user } = res.locals;
    const { success, data, error } = receiverIdSchema.safeParse(req.body);

    if (!success) {
      return next({
        status: 400,
        message: 'Schema validation error.',
        errors: error.errors,
      });
    }

    const receiverId = parseInt(data.receiverId, 10);

    try {
      const receiver = await postgresClient.user.findUnique({
        where: { id: receiverId },
      });

      if (!receiver) {
        return next({
          status: 404,
          message: 'Receiver not found',
        });
      }

      // Only one private between two users at a time
      const existingPrivate = await postgresClient.conversation.findFirst({
        where: {
          users: {
            every: {
              id: { in: [user.id, receiver.id] },
            },
          },
        },
      });

      if (existingPrivate) {
        return res.json({
          created: false,
          ...existingPrivate,
        });
      }

      const privateConversation = await postgresClient.conversation.create({
        data: {
          users: {
            connect: [{ email: user.email }, { email: receiver.email }],
          },
        },
      });

      return res.status(201).json({
        created: true,
        ...privateConversation,
      });
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },
};
