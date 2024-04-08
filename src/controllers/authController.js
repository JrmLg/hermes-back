import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../models/client.js';
import userSchema from '../utils/validation/userSchema.js';

export default {
  signup: async (req, res, next) => {
    try {
      // Validation des données avec zod
      const { success, data, error } = userSchema.safeParse(req.body);

      if (!success) {
        // erreur de validation de schéma zod !
        return next({
          status: 400,
          message: 'Schema validation error.',
          errors: error.errors,
        });
      }

      const {
        email, firstname, lastname, password, rppsCode,
      } = data;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Vérification si le mail ou le code RPPS existe déjà en BDD
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { rppsCode },
          ],
        },
      });

      if (user) {
        return next({
          status: 409,
          message: 'User already exists.',
          email,
        });
      }

      // Formater les noms "bob" ou "BOB" => "Bob"
      const formatedFirstname = firstname[0].toUpperCase() + firstname.slice(1).toLowerCase();
      const formatedLastname = lastname[0].toUpperCase() + lastname.slice(1).toLowerCase();

      // Création de l'utilisateur en BDD
      const newUser = await prisma.user.create({
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

  login: async (req, res, next) => {
    try {
      // Validation des données avec zod
      const { success, data, error } = userSchema.partial().safeParse(req.body);

      if (!success) {
        // erreur de validation de schéma zod !
        return next({
          status: 400,
          message: 'Schema validation error.',
          errors: error.errors,
        });
      }

      const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: {
          roles: true,
        },
      });

      if (!user) {
        return next({
          status: 404,
          message: 'User not found.',
        });
      }

      const passwordMatch = await bcrypt.compare(data.password, user.password);

      if (!passwordMatch) {
        return next({
          status: 401,
          message: 'Invalid password.',
        });
      }

      // Générer un token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Ajouter le token dans les headers de la réponse
      res.setHeader('Authorization', `Bearer ${token}`);

      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      return next(error);
    }
  },

};
