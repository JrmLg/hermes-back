import jwt from 'jsonwebtoken';
import postgresClient from '../models/postgresClient.js';

const authentificationService = {
  async verifyJWT(cookies, next) {
    // Récupération du token dans le cookie
    const token = cookies.Authorization;
    // Si le token n'est pas présent
    if (!token) {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }

    // Vérification du token
    try {
      const publicKey = process.env.JWT_ES256_PUBLIC_KEY;
      const decodedToken = jwt.verify(token, publicKey, { algorithm: 'ES256' });
      const { userId } = decodedToken;

      // Vérification de l'utilisateur en BDD
      const user = await postgresClient.user.findUnique({
        where: { id: userId },
        include: {
          roles: true,
        },
      });

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      delete user.password;

      return user;
    } catch (err) {
      return next(err);
    }
  },

  generateJWT(user) {
    // Générer un token JWT
    const privateKey = process.env.JWT_ES256_PRIVATE_KEY;
    const token = jwt.sign({ userId: user.id }, privateKey, {
      expiresIn: '1h',
      algorithm: 'ES256',
    });

    return token;
  },
};

export default authentificationService;
