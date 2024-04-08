export default {
  role: {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the role.' },
      title: { type: 'string', description: "Role's title." },
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
      title: 'HAD Manager',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10 09:43:05.757',
    },
  },
};
