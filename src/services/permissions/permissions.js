const permissions = {
  // [ postgres table name ]
  user: {
    all: {
      canCreateUser: 'canCreateUser',
      canReadUser: 'canReadUser',
      canUpdateUser: 'canUpdateUser',
      canDeleteUser: 'canDeleteUser',
    },
    one: {},
  },
  speciality: {
    all: {
      canCreateSpeciality: 'canCreateSpeciality',
      canReadSpeciality: 'canReadSpeciality',
      canUpdateSpeciality: 'canUpdateSpeciality',
      canDeleteSpeciality: 'canDeleteSpeciality',
    },
    one: {},
  },
  role: {
    all: {
      canCreateRole: 'canCreateRole',
      canReadRole: 'canReadRole',
      canUpdateRole: 'canUpdateRole',
      canDeleteRole: 'canDeleteRole',
    },
    one: {},
  },
  team: {
    all: {
      canCreateTeam: 'canCreateTeam',
      canReadTeam: 'canReadTeam',
      canUpdateTeam: 'canUpdateTeam',
      canDeleteTeam: 'canDeleteTeam',
    },
    one: {
      canAddUserInTeamId: 'canAddUserInTeamId',
      canRemoveUserInTeamId: 'canRemoveUserInTeamId',
    },
  },
  setting: {
    all: {
      canCreateSetting: 'canCreateSetting',
      canReadSetting: 'canReadSetting',
      canUpdateSetting: 'canUpdateSetting',
      canDeleteSetting: 'canDeleteSetting',
    },
    one: {},
  },
  settingKey: {
    all: {
      canCreateSettingKey: 'canCreateSettingKey',
      canReadSettingKey: 'canReadSettingKey',
      canUpdateSettingKey: 'canUpdateSettingKey',
      canDeleteSettingKey: 'canDeleteSettingKey',
    },
    one: {},
  },
  conversation: {
    all: {
      canCreateConversation: 'canCreateConversation',
      canReadConversation: 'canReadConversation',
      canUpdateConversation: 'canUpdateConversation',
      canDeleteConversation: 'canDeleteConversation',
    },
    one: {},
  },
  patient: {
    all: {
      canCreatePatient: 'canCreatePatient',
      canReadPatient: 'canReadPatient',
      canUpdatePatient: 'canUpdatePatient',
      canDeletePatient: 'canDeletePatient',
    },
    one: {},
  },
  channel: {
    all: {
      canCreateChannel: 'canCreateChannel',
      canReadChannel: 'canReadChannel',
      canUpdateChannel: 'canUpdateChannel',
      canDeleteChannel: 'canDeleteChannel',
    },
    one: {},
  },
  channelType: {
    all: {
      canCreateChannelType: 'canCreateChannelType',
      canReadChannelType: 'canReadChannelType',
      canUpdateChannelType: 'canUpdateChannelType',
      canDeleteChannelType: 'canDeleteChannelType',
    },
    one: {
      canReadInChannelTypeId: 'canReadInChannelTypeId',
      canWriteInChannelTypeId: 'canWriteInChannelTypeId',
    },
  },
  zipCode: {
    all: {
      canCreateZipCode: 'canCreateZipCode',
      canReadZipCode: 'canReadZipCode',
      canUpdateZipCode: 'canUpdateZipCode',
      canDeleteZipCode: 'canDeleteZipCode',
    },
    one: {},
  },
  city: {
    all: {
      canCreateCity: 'canCreateCity',
      canReadCity: 'canReadCity',
      canUpdateCity: 'canUpdateCity',
      canDeleteCity: 'canDeleteCity',
    },
    one: {},
  },

  // [ mongo table name ]
  message: {
    all: {
      canCreateMessage: 'canCreateMessage',
      canReadMessage: 'canReadMessage',
      canUpdateMessage: 'canUpdateMessage',
      canDeleteMessage: 'canDeleteMessage',
    },
    one: {},
  },
  attachment: {
    all: {
      canCreateAttachment: 'canCreateAttachment',
      canReadAttachment: 'canReadAttachment',
      canUpdateAttachment: 'canUpdateAttachment',
      canDeleteAttachment: 'canDeleteAttachment',
    },
    one: {},
  },
  lastMessageRead: {
    all: {
      canCreateLastMessageRead: 'canCreateLastMessageRead',
      canReadLastMessageRead: 'canReadLastMessageRead',
      canUpdateLastMessageRead: 'canUpdateLastMessageRead',
      canDeleteLastMessageRead: 'canDeleteLastMessageRead',
    },
    one: {},
  },
  permission: {
    all: {
      canCreatePermission: 'canCreatePermission',
      canReadPermission: 'canReadPermission',
      canUpdatePermission: 'canUpdatePermission',
      canDeletePermission: 'canDeletePermission',
    },
    one: {},
  },
  refreshToken: {
    all: {
      canCreateRefreshToken: 'canCreateRefreshToken',
      canReadRefreshToken: 'canReadRefreshToken',
      canUpdateRefreshToken: 'canUpdateRefreshToken',
      canDeleteRefreshToken: 'canDeleteRefreshToken',
    },
    one: {},
  },
};

for (const tableName of Object.keys(permissions)) {
  const table = permissions[tableName];

  permissions[tableName] = {
    all: Object.fromEntries(
      Object.entries(table.all).map(([pKey, pName]) => [
        pKey,
        {
          tableName,
          permissionName: pName,
        },
      ]),
    ),

    one: Object.fromEntries(
      Object.entries(table.one).map(([pKey, pName]) => [
        pKey,
        (id) => ({
          recordId: id,
          tableName,
          permissionName: pName,
        }),
      ]),
    ),
  };
}

export default permissions;
