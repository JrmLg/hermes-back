// [ packages imports ]
import bcrypt from 'bcrypt';
import '../helpers/envLoader.js';

// [ local imports ]
import postgresClient from '../models/postgresClient.js';
import userSchema from '../utils/validation/userSchema.js';
import formatingName from '../utils/formatingFunctions/formatingName.js';
import authentificationService from '../services/authentification.js';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export default {
  async signup(req, res, next) {
    try {
      const { success, data, error } = userSchema.safeParse(req.body);

      if (!success) {
        // erreur de validation de schéma zod !
        return next({
          status: 400,
          message: 'Schema validation error.',
          errors: error.errors,
        });
      }

      const { email, firstname, lastname, password, rppsCode } = data;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Vérification si le mail ou le code RPPS existe déjà en BDD
      const user = await postgresClient.user.findFirst({
        where: {
          OR: [{ email }, { rppsCode }],
        },
      });

      if (user) {
        return next({
          status: 409,
          message: 'User already exists.',
          email,
          rppsCode,
        });
      }

      const formatedFirstname = formatingName(firstname);
      const formatedLastname = formatingName(lastname);

      // Création de l'utilisateur en BDD
      const newUser = await postgresClient.user.create({
        data: {
          email,
          firstname: formatedFirstname,
          lastname: formatedLastname,
          password: hashedPassword,
          rppsCode,
        },
      });
      delete newUser.password;

      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { success } = userSchema.partial().safeParse({ email });

      const errorMessage = {
        status: 401,
        message: 'Invalid email or password.',
      };
      if (!success || !password) {
        // erreur de validation de schéma zod ou pas de mot de passe fourni !
        return next(errorMessage);
      }

      const user = await postgresClient.user.findUnique({
        where: { email },
      });

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!user || !checkPassword) {
        return next(errorMessage);
      }

      // Générer un token JWT via le service d'authentification
      const token = authentificationService.generateJWT(user);

      // Ajouter le token dans un cookie
      const cookieOptions = {
        httpOnly: true, // Le cookie n'est pas accessible via JavaScript côté client
        secure: process.env.NODE_ENV !== 'production', // En production, envoyer le cookie uniquement sur HTTPS
        maxAge: ONE_HOUR, // Durée de vie du cookie 1 heure
        sameSite: 'strict', // Le cookie est envoyé uniquement pour les requêtes du même site
      };
      res.cookie('Authorization', token, cookieOptions);

      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req, res, next) {
    try {
      // Effacer le token JWT dans les cookies
      res.cookie('Authorization', '');

      return res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
      return next(error);
    }
  },
};
