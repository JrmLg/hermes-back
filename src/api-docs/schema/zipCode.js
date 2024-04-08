export default {
  zipCode: {
    type: 'object',
    required: ['code', 'city_id'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the zip code.' },
      code: { type: 'string', description: "Zip code's code." },
      city_id: { type: 'integer', description: "Zip code's city id." },
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
      code: '75000',
      city_id: 2,
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10',
    },
  },
};
