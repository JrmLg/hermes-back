export default {
  socket: {
    type: 'object',
    required: ['socketId'],
    properties: {
      socketId: { type: 'string', description: 'The socket ID of the user.' },
    },
    example: {
      socketId: 'CaPE9JCRjm0d7Pm_AAAB',
    },
  },
};
