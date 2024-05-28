import mongoClient from '../../models/mongoClient.js';
import postgresClient from '../../models/postgresClient.js';
import permissions from './permissions.js';

/**
 * Check if the permission arguments are valid throw an error if not.
 * */
async function checkPermissionArguments({ tableName, permissionName, recordId }) {
  if (!tableName) {
    throw new Error('A tableName is required to set a permission.');
  }
  if (!permissionName) {
    throw new Error('A permissionName is required to set a permission.');
  }

  if (!Object.keys(permissions).includes(tableName)) {
    throw new Error(`TableName '${tableName}' not found in table names : \n[${Object.keys(permissions).map((p) => '\n\t' + p)}\n]`);
  }

  if (recordId) {
    // Permission scoped to a record
    const recordPermissions = Object.values(permissions[tableName].one).map((pFunc) => pFunc().permissionName);

    if (!recordPermissions.includes(permissionName)) {
      throw new Error(
        `PermissionName '${permissionName}' for table '${tableName}' not found.\nValid permissions : [${recordPermissions.map((p) => '\n\t' + p)}\n]`,
      );
    }
  } else {
    // Permission scoped to the table
    const tablePermissions = Object.values(permissions[tableName].all).map((p) => p.permissionName);

    if (!tablePermissions.includes(permissionName)) {
      throw new Error(
        `PermissionName '${permissionName}' for table '${tableName}' not found.\nValid permissions : [${tablePermissions.map((p) => '\n\t' + p)}\n]`,
      );
    }
  }
}

const permissionService = {
  permissions,

  async createRole({ name }) {
    return postgresClient.role.upsert({
      where: { name },
      create: { name },
      update: {},
    });
  },

  async findRoleByName({ name }) {
    return postgresClient.role.findUnique({
      where: {
        name,
      },
    });
  },

  async findRole({ id }) {
    return postgresClient.role.findUnique({
      where: {
        id,
      },
    });
  },

  async deleteRoleByName({ name }) {
    try {
      const deletedRole = await postgresClient.role.delete({
        where: {
          name,
        },
      });

      if (!deletedRole) return null;

      const deletedPermissions = await this.removeAllRolePermissions({
        roleId: deletedRole.id,
      });

      return { ...deletedRole, permissions: deletedPermissions };
    } catch (error) {
      return null;
    }
  },

  async deleteRole({ id }) {
    try {
      const deletedRole = await postgresClient.role.delete({
        where: {
          id,
        },
      });

      const deletedPermissions = await this.removeAllRolePermissions({
        roleId: id,
      });

      return { ...deletedRole, permissions: deletedPermissions };
    } catch (error) {
      return null;
    }
  },

  async removeAllRolePermissions({ roleId }) {
    return mongoClient.permission.deleteMany({
      where: {
        roleId,
      },
    });
  },

  async removeAllUserPermissions({ userId }) {
    return mongoClient.permission.deleteMany({
      where: {
        userId,
      },
    });
  },

  async addUserPermission(userId, { tableName, permissionName, recordId }) {
    await checkPermissionArguments({ tableName, permissionName, recordId });

    const data = { userId, tableName, permissionName, recordId };

    const permission = await mongoClient.permission.findFirst({ where: data });

    if (permission) {
      return permission;
    } else {
      return mongoClient.permission.create({ data });
    }
  },

  async removeUserPermission(userId, { tableName, permissionName, recordId }) {
    await checkPermissionArguments({ tableName, permissionName, recordId });

    return mongoClient.permission.deleteMany({
      where: {
        userId,
        tableName,
        permissionName,
        recordId,
      },
    });
  },

  async addRolePermission(roleId, { tableName, permissionName, recordId }) {
    await checkPermissionArguments({ tableName, permissionName, recordId });

    const data = { roleId, tableName, permissionName, recordId };

    const permission = await mongoClient.permission.findFirst({ where: data });

    if (permission) {
      return permission;
    } else {
      return mongoClient.permission.create({ data });
    }
  },

  async removeRolePermission(roleId, { tableName, permissionName, recordId }) {
    await checkPermissionArguments({ tableName, permissionName, recordId });

    return mongoClient.permission.deleteMany({
      where: {
        roleId,
        tableName,
        permissionName,
        recordId,
      },
    });
  },

  async getUserPermissions(userId) {
    return mongoClient.permission.findMany({
      where: {
        userId,
      },
    });
  },

  async getRolePermissions(roleId) {
    return mongoClient.permission.findMany({
      where: {
        roleId,
      },
    });
  },

  async addRoleToUser(userId, roleId) {
    return postgresClient.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
      include: {
        roles: true,
      },
    });
  },

  async addRoleToUserByRoleName(userId, roleName) {
    return postgresClient.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connectOrCreate: {
            where: { name: roleName },
            create: { name: roleName },
          },
        },
      },
      include: {
        roles: true,
      },
    });
  },

  async removeRoleFromUser(userId, roleId) {
    return postgresClient.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          disconnect: {
            id: roleId,
          },
        },
      },
      include: {
        roles: true,
      },
    });
  },

  async removeRoleFromUserByRoleName(userId, roleName) {
    return postgresClient.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          disconnect: {
            name: roleName,
          },
        },
      },
      include: {
        roles: true,
      },
    });
  },

  async hasPermission(userId, { tableName, permissionName, recordId }) {
    await checkPermissionArguments({ tableName, permissionName, recordId });

    if (!userId) {
      throw new Error('A userId is required to check a permission.');
    }

    const user = await postgresClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    const permission = await mongoClient.permission.findFirst({
      where: {
        OR: [
          {
            roleId: { in: user.roles.map((r) => r.id) },
            tableName,
            permissionName,
            recordId,
          },
          { userId, tableName, permissionName, recordId },
        ],
      },
    });

    return Boolean(permission);
  },

  async renameRole({ roleId, name }) {
    return postgresClient.role.update({
      where: { id: roleId },
      data: { name },
    });
  },
};

export default permissionService;
