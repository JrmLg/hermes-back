import authentificationService from '../services/authentification.js';
import '../helpers/envLoader.js';

async function loginRequired(req, res, next) {
  const user = await authentificationService.verifyJWT(req.cookies, next);

  res.locals.user = user;

  return next();
}

export default loginRequired;
