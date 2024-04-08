export default {
  speciality: {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the speciality.' },
      title: { type: 'string', description: "Speciality's title." },
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
      title: 'Cardiologist',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10 09:43:05.757',
    },
  },
};
