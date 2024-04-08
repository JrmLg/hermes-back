export default {
  getMe: async (req, res) => {
    // Reconstitution de l'objet user pour formater les données roles
    const user = {
      ...res.locals.user,
      roles: res.locals.user.roles.map((userHasRole) => userHasRole.role),
    };

    return res.status(200).json({ user });
  },
};
