export default {
  city: {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the city.' },
      name: { type: 'string', description: "City's name." },
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
      name: 'Paris',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10',
    },
  },
};
