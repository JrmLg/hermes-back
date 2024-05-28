export default {
  userList: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'The auto-generated id for the user.' },
        firstname: { type: 'string', description: "User's firstname." },
        lastname: { type: 'string', description: "User's lastname." },
        email: { type: 'string', description: "User's email." },
        rppsCode: { type: 'string', description: "User's RPPS code." },
        profilePictureUrl: { type: 'string', description: "User's profile picture URL." },
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
    },
    example: [
      {
        id: 1,
        firstname: 'Alice',
        lastname: 'Smith',
        email: 'alice@smith.com',
        rppsCode: '12345678901',
        profilePictureUrl: 'https://example.com/image1.jpg',
        createdAt: '2024-04-09T09:28:59.605Z',
        updatedAt: '2024-04-09T09:28:59.605Z',
      },
      {
        id: 2,
        firstname: 'Bob',
        lastname: 'Brown',
        email: 'bob@brown.com',
        rppsCode: '12345678902',
        profilePictureUrl: 'https://example.com/image2.jpg',
        createdAt: '2024-04-09T09:28:59.695Z',
        updatedAt: '2024-04-09T09:28:59.695Z',
      },
    ],
  },
};
