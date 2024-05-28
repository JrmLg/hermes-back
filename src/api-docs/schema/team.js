export default {
  team: {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the team.' },
      ownerId: { type: 'integer', description: "Team's owner id." },
      name: { type: 'string', description: "Team's name." },
      color: { type: 'string', description: "Team's color." },
      profilePictureUrl: { type: 'string', description: "Team's profile picture." },
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
      owner_id: 2,
      name: 'Yellow Team',
      color: '#FF0000',
      profilePictureUrl: 'https://www.example.com/profile.jpg',
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10 09:43:05.757',
    },
  },
};
