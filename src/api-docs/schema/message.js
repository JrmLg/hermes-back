export default {
  message: {
    type: 'object',
    required: ['content', 'deleted', 'authorId'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the message.' },
      content: { type: 'string', description: "Message's content." },
      deleted: { type: 'boolean', description: 'Message is deleted or not.' },
      relatedAt: { type: 'integer', description: 'Message related at.' },
      authorId: { type: 'integer', description: "Message's sender id." },
      privateId: { type: 'integer', description: "Message's private id." },
      teamId: { type: 'integer', description: "Message's team id." },
      channelId: { type: 'integer', description: "Message's channel id." },
    },
    example: {
      id: 2,
      content: 'Hello',
      deleted: false,
      related_at: 1,
      author_id: 2,
      private_id: 1,
      team_id: null,
      channel_id: null,
    },
  },
};
