import permissionService from '../utils/permissions/permissionService.js';

export default function permissionRequired(
  { tableName, permissionName, recordId },
  idParamsName,
) {
  return async (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
      throw new Error(
        'Cannot require permission without using the loginRequired middleware before.',
      );
    }

    if (
      await permissionService.hasPermission(user.id, {
        tableName,
        permissionName,
        recordId,
      })
    ) {
      next();
    } else {
      next({
        status: 403,
        message: `Permission denied : [${permissionName}] on [${tableName}]${recordId ? ` with id [${recordId}]` : ''}`,
      });
    }
  };
}
