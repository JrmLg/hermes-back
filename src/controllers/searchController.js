import postgresClient from '../models/postgresClient.js';

export default {
  async getUser(req, res, next) {
    // const { user } = res.locals; --> utilisateur connecté
    const userId = parseInt(req.query.userId, 10);
    try {
      const user = await postgresClient.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          rppsCode: true,
          profilePictureUrl: true,
        },
      });
      console.log('user :', user);
      return res.status(200).json(user);
    } catch (error) {
      return next({
        status: 500,
        message: 'Internal server error',
        error,
      });
    }
  },
};
