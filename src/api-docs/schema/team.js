export default {
  team: {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the team.' },
      name: { type: 'string', description: "Team's name." },
      profile_picture_url: { type: 'string', description: "Team's profile picture." },
      color: { type: 'string', description: "Team's color." },
      owner_id: { type: 'integer', description: "Team's owner id." },
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
      name: 'Yellow Team',
      profile_picture_url: 'https://www.example.com/profile.jpg',
      color: '#FF0000',
      owner_id: 2,
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10 09:43:05.757',
    },
  },
};
