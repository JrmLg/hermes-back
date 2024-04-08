export default {
  channel: {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the channel.' },
      title: { type: 'string', description: "Channel's title." },
      color: { type: 'string', description: "Channel's color." },
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
      title: 'General',
      color: '#FF0000',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10',
    },
  },
};
