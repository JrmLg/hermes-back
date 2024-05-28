import mongoClient from '../models/mongoClient.js';

import socketSchema from '../utils/validation/socketSchema.js';

export default {
  async getAllSocketIds(req, res, next) {
    try {
      const socketIds = await mongoClient.socket.findMany({
        where: {
          userId: res.locals.user.id,
        },
      });
      return res.json(socketIds);
    } catch (error) {
      return next(error);
    }
  },

  async addSocketId(req, res, next) {
    try {
      const { success, data, error } = socketSchema.safeParse(req.body);

      if (!success) {
        return next({
          status: 400,
          message: 'Schema validation error.',
          errors: error.errors,
        });
      }

      const { socketId } = data;

      const socketBinding = await mongoClient.socket.create({
        data: {
          userId: res.locals.user.id,
          socketId,
        },
      });

      return res.status(201).json(socketBinding);
    } catch (error) {
      return next(error);
    }
  },
};
