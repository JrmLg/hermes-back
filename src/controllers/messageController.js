import { fileTypeFromFile } from 'file-type';
import { rename } from 'node:fs';
import messageService from '../services/message/messageService.js';
import messageSchema from '../utils/validation/messageSchema.js';
import mongoClient from '../models/mongoClient.js';

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

  async registerAttachments(req, res, next) {
    console.log('👆 req.file: ', req.file);
    // on récupère nos données en provenance du front
    const { messageId } = req.params;
    const {
      path, filename,
    } = req.file;

    try {
      // Le type de fichier déduis par multer n'est pas fiable (il est déduis dedpuis l'en-tête de la requête HTTP), donc je retrouve le type du fichier à partir d'un autre module (qui lui va analyser le fichier).
      const fileType = await fileTypeFromFile(path);

      // on renomme notre fichier en ajoutant l'extension
      const oldPath = path;
      const newPath = `${path}.${fileType.ext}`;
      rename(oldPath, newPath, (err) => {
        if (err) throw err;
      });
      const filenameWithExtension = `${filename}.${fileType.ext}`;

      // on insère notre le lien vers notre PJ en bdd Mongo
      const mongoRecord = await mongoClient.attachment.create({
        data: {
          url: newPath,
          type: fileType.mime,
          filename: filenameWithExtension,
          messageId,
        },
      });
      return res.status(201).json({
        created: true,
        ...mongoRecord,
      });
    } catch (error) {
      return next({
        status: 500,
        message: 'Internal Server Error',
        error,
      });
    }
  },

  async uploadSeveralAttachments(req, res, next) {

  },

  async deleteOneAttachment(req, res, next) {

  },

  async deleteAllAttachment(req, res, next) {

  },
};
