export default {
  settings: {
    type: 'object',
    required: ['user_id', 'key_id', 'value'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the setting.' },
      user_id: { type: 'integer', description: "Setting's user id." },
      key_id: { type: 'integer', description: "Setting's key id." },
      value: { type: 'string', description: "Setting's value." },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date of creation.',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date of last update.',
      },
    },
    example: {
      id: 2,
      user_id: 2,
      key_id: 2,
      value: 'value',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10 09:43:05.757',
    },
  },
};
