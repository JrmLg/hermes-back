import messageService from '../services/message/messageService.js';
import messageSchema from '../utils/validation/messageSchema.js';

export default {
  async createMessage(req, res, next) {
    const { user } = res.locals;
    const { success, data, error } = messageSchema.safeParse(req.body);

    if (!success) {
      return next({
        status: 400,
        message: 'Schema validation error.',
        errors: error.errors,
      });
    }

    const { content, roomId, roomType } = data;

    try {
      const canAccessRoom = await messageService.canAccessRoom({
        roomType,
        roomId,
        userId: user.id,
      });

      if (!canAccessRoom) {
        return next({
          status: 403,
          message: 'You are not allowed to access this room',
        });
      }

      const message = await messageService.createMessage({
        roomType,
        authorId: user.id,
        roomId,
        content,
      });

      await messageService.updateLastMessageRead({
        roomType,
        userId: user.id,
        roomId,
        messageId: message.id,
      });

      const roomName = 'message';
      const roomArgs = { roomId, roomType };
      const socketRoomId = `${roomName}:${roomType}:${roomId}`;

      req.app.get('io').to(socketRoomId).emit('newMessage', {
        room: { roomName, roomArgs },
        message,
        author: user,
      });

      return res.status(201).json(message);
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },

  async updateMessage(req, res, next) {
    const { user } = res.locals;
    const { success, data, error } = messageSchema.partial().safeParse(req.body);

    if (!success) {
      return next({
        status: 400,
        message: 'Schema validation error.',
        errors: error.errors,
      });
    }

    const { content } = data;

    const { messageId } = req.params;

    try {
      const updatedMessage = await messageService.updateMessage({
        messageId,
        authorId: user.id,
        content,
      });

      if (!updatedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }

      // TODO Passer ce bloc dans le message service
      let roomType;
      let roomId;

      if (updatedMessage.conversationId) {
        roomType = 'private';
        roomId = updatedMessage.conversationId;
      } else if (updatedMessage.channelId) {
        roomType = 'channel';
        roomId = updatedMessage.channelId;
      } else if (updatedMessage.teamId) {
        roomType = 'team';
        roomId = updatedMessage.teamId;
      } else {
        return next({
          status: 500,
          message: 'Internal database error',
          error: 'Message has no roomType or roomId',
        });
      }

      // Préparation des données pour l'événement Websocket
      const roomName = 'message';
      const roomArgs = { roomId, roomType };
      const socketRoomId = `${roomName}:${roomType}:${roomId}`;

      // Envoi de l'événement Websocket
      req.app.get('io').to(socketRoomId).emit('updatedMessage', {
        room: { roomName, roomArgs },
        updatedMessage,
        author: user,
      });

      return res.status(200).json(updatedMessage);
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },

  async deleteMessage(req, res, next) {
    const { messageId } = req.params;
    const { user } = res.locals;

    try {
      const deletedMessage = await messageService.deleteMessage({
        messageId,
        authorId: user.id,
      });

      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }

      let roomType;
      let roomId;

      if (deletedMessage.conversationId) {
        roomType = 'private';
        roomId = deletedMessage.conversationId;
      } else if (deletedMessage.channelId) {
        roomType = 'channel';
        roomId = deletedMessage.channelId;
      } else if (deletedMessage.teamId) {
        roomType = 'team';
        roomId = deletedMessage.teamId;
      } else {
        return next({
          status: 500,
          message: 'Internal database error',
          error: 'Message has no roomType or roomId',
        });
      }

      // Préparation des données pour l'événement Websocket
      const roomName = 'message';
      const roomArgs = { roomId, roomType };
      const socketRoomId = `${roomName}:${roomType}:${roomId}`;

      // Envoi de l'événement Websocket
      req.app.get('io').to(socketRoomId).emit('deletedMessage', {
        room: { roomName, roomArgs },
        deletedMessage,
        author: user,
      });

      return res.status(200).json(deletedMessage);
    } catch (err) {
      return next({
        status: 500,
        message: 'Internal server error',
        error: err,
      });
    }
  },

  async getOneRoomWithMessages(req, res, next) {
    const { user } = res.locals;

    const { roomType } = req.params;
    const roomId = parseInt(req.params.roomId, 10);
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 50;
    const originTimestamp = parseInt(req.query.originTimestamp, 10) || Date.now();
    const timelineDirection = req.query.timelineDirection || 'older';

    try {
      const canAccesRoom = await messageService.canAccessRoom({ roomType, userId: user.id, roomId });

      if (!canAccesRoom) {
        return res.status(403).json({ message: 'You are not allowed to access this room.' });
      }

      const messagesWithPagination = await messageService.getMessagesWithPagination({
        roomType,
        roomId,
        page,
        pageSize,
        originTimestamp,
        timelineDirection,
      });

      return res.status(200).json({
        roomType,
        roomId,
        ...messagesWithPagination,
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
